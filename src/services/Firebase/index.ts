import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import * as Facebook from 'expo-facebook';

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

export const registerWithEmail = (email: string, password: string) =>
	auth.createUserWithEmailAndPassword(email, password);

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
				db.collection('public')
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
