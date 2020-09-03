import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import * as Facebook from 'expo-facebook';
import { extname } from 'path';

import firebaseConfig from './firebaseConfig';

// Initialize Firebase App

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();

export const loginWithEmail = (email: string, password: string) =>
	auth.signInWithEmailAndPassword(email, password);

export const loginWithFacebook = async () => {
	await Facebook.initializeAsync(firebaseConfig.facebookAppId);

	const { type, token } = await Facebook.logInWithReadPermissionsAsync({
		permissions: ['public_profile'],
	});

	if (type !== 'success') throw 'Unable to login with facebook';

	const credential = firebase.auth.FacebookAuthProvider.credential(token);
	return auth.signInWithCredential(credential);
};

export const registerWithEmail = (
	name: string,
	email: string,
	password: string
) =>
	auth.createUserWithEmailAndPassword(email, password).then(({ user }) => {
		if (user)
			user.updateProfile({
				displayName: name,
			});
	});

export const logout = () => auth.signOut();

export const passwordReset = (email: string) =>
	auth.sendPasswordResetEmail(email);

export const saveExpoPushToken = (token: string | undefined) => {
	if (!token) return;

	db.collection('private')
		.doc(auth.currentUser?.uid)
		.withConverter(privateConverter)
		.get()
		.then((doc) => {
			if (!doc.exists || !doc.data()?.ExpoPushToken?.includes(token)) {
				db.collection('private')
					.doc(auth.currentUser?.uid)
					.set({
						ExpoPushToken: [
							...(doc.data()?.ExpoPushToken || []),
							token,
						],
					});
			}
		});
};

export const uploadAvatar = (
	file: Blob,
	fileName: string,
	cb: (user: firebase.User) => void
) => {
	// Create a Storage Ref w/ username
	const storageRef = firebase
		.storage()
		.ref('avatar/' + auth.currentUser?.uid + extname(fileName));

	// Upload file
	const task = storageRef.put(file, {
		cacheControl: 'public,max-age=86400',
	});

	// Register three observers:
	// 1. 'state_changed' observer, called any time the state changes
	// 2. Error observer, called on failure
	// 3. Completion observer, called on successful completion
	task.on(
		'state_changed',
		(snapshot) => {
			// Observe state change events such as progress, pause, and resume
			// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
			var progress =
				(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log('Upload is ' + progress + '% done');
			switch (snapshot.state) {
				case firebase.storage.TaskState.PAUSED: // or 'paused'
					console.log('Upload is paused');
					break;
				case firebase.storage.TaskState.RUNNING: // or 'running'
					console.log('Upload is running');
					break;
			}
		},
		(error) => {
			// Handle unsuccessful uploads
		},
		() => {
			// Handle successful uploads on complete
			// For instance, get the download URL: https://firebasestorage.googleapis.com/...
			task.snapshot.ref.getDownloadURL().then(function (downloadURL) {
				auth.currentUser
					?.updateProfile({
						photoURL: downloadURL,
					})
					.then(() => {
						if (auth.currentUser) cb(auth.currentUser);
					});
			});
		}
	);
};

interface priv {
	ExpoPushToken: string[];
}

// Firestore data converter
const privateConverter = {
	toFirestore({ ExpoPushToken }: priv): firebase.firestore.DocumentData {
		return {
			ExpoPushToken,
		};
	},
	fromFirestore(
		snapshot: firebase.firestore.QueryDocumentSnapshot,
		options: firebase.firestore.SnapshotOptions
	): priv {
		const { ExpoPushToken } = snapshot.data(options);
		return {
			ExpoPushToken,
		};
	},
};
