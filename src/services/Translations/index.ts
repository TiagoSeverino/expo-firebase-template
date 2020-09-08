import * as Localization from 'expo-localization';
import i18n from 'i18n-js';

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
	en: {
		welcome: {
			title: 'Expo Firebase Starter',
			login: 'Login',
			register: 'Register',
			'fb-login': 'Continue with Facebook',
			'fb-login-error': 'Unable to login with facebook',
		},
		register: {
			'enter-name': 'Enter name',
			'enter-email': 'Enter email',
			'enter-password': 'Enter password',
			'confirm-password': 'Confirm password',
			'enter-valid-mail': 'Please enter a valid email',
			'pass-min': 'Password must have at least %{n} characters',
			'pass-confirm': 'Confirm Password must match Password',
			'pass-required': 'Confirm Password is required',
		},
		login: {
			'registered-email': 'Please enter a registered email',
			'forgot-password': 'Forgot Password?',
		},
		'forgot-password': {
			'forgot-password': 'Forgot Password',
		},
		home: {},
		settings: {
			'push-notifications': 'Push Notifications',
			'upload-avatar': 'Upload Avatar',
			language: 'Language',
			'sign-out': 'Sign out',
		},
	},
	pt: {
		welcome: {
			title: 'Expo Firebase Starter',
			login: 'Entrar',
			register: 'Registar',
			'fb-login': 'Continuar com Facebook',
			'fb-login-error': 'Erro ao entrar com facebook',
		},
		register: {
			'enter-name': 'Nome',
			'enter-email': 'Email',
			'enter-password': 'Password',
			'confirm-password': 'Confirmar password',
			'enter-valid-mail': 'Introduza um email válido',
			'pass-min': 'A password deve ter pelo menos %{n} caracteres',
			'pass-confirm': 'As passwords não correspondem',
			'pass-required': 'Confirme a password',
		},
		login: {
			'registered-email': 'Introduza um email registado',
			'forgot-password': 'Esqueceu-se da password?',
		},
		'forgot-password': {
			'forgot-password': 'Recuperar Password',
		},
		home: {},
		settings: {
			'push-notifications': 'Notiicações',
			'upload-avatar': 'Atualizar Avatar',
			language: 'Linguagem',
			'sign-out': 'Sair',
		},
	},
};
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = 'en';

export default i18n;
