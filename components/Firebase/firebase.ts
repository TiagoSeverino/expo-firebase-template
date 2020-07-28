import * as firebase from 'firebase';
import 'firebase/auth';

import firebaseConfig from './firebaseConfig';

// Initialize Firebase App

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();

export const loginWithEmail = (email: string, password: string) =>
	auth.signInWithEmailAndPassword(email, password);

export const registerWithEmail = (email: string, password: string) =>
	auth.createUserWithEmailAndPassword(email, password);

export const logout = () => auth.signOut();

export const passwordReset = (email: string) =>
	auth.sendPasswordResetEmail(email);
