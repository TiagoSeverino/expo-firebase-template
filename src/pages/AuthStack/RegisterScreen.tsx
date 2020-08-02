import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import * as Yup from 'yup';

import i18n from '../../services/Translations';
import Colors from '../../utils/colors';
import SafeView from '../../components/SafeView';
import Form from '../../components/Forms/Form';
import FormField from '../../components/Forms/FormField';
import FormButton from '../../components/Forms/FormButton';
import IconButton from '../../components/IconButton';
import FormErrorMessage from '../../components/Forms/FormErrorMessage';
import { registerWithEmail } from '../../services/Firebase/firebase';
import useStatusBar from '../../hooks/useStatusBar';

const validationSchema = Yup.object().shape({
	name: Yup.string().required().label('Name'),
	email: Yup.string()
		.required(i18n.t('register.enter-valid-mail'))
		.email()
		.label('Email'),
	password: Yup.string()
		.required()
		.min(6, i18n.t('register.pass-min', { n: 6 }))
		.label('Password'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password')], i18n.t('register.pass-confirm'))
		.required(i18n.t('register.pass-required')),
});

export default function RegisterScreen({ navigation }) {
	useStatusBar('light-content');

	const [passwordVisibility, setPasswordVisibility] = useState(true);
	const [rightIcon, setRightIcon] = useState('eye');
	const [confirmPasswordIcon, setConfirmPasswordIcon] = useState('eye');
	const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(
		true
	);
	const [registerError, setRegisterError] = useState('');

	function handlePasswordVisibility() {
		if (rightIcon === 'eye') {
			setRightIcon('eye-off');
			setPasswordVisibility(!passwordVisibility);
		} else if (rightIcon === 'eye-off') {
			setRightIcon('eye');
			setPasswordVisibility(!passwordVisibility);
		}
	}

	function handleConfirmPasswordVisibility() {
		if (confirmPasswordIcon === 'eye') {
			setConfirmPasswordIcon('eye-off');
			setConfirmPasswordVisibility(!confirmPasswordVisibility);
		} else if (confirmPasswordIcon === 'eye-off') {
			setConfirmPasswordIcon('eye');
			setConfirmPasswordVisibility(!confirmPasswordVisibility);
		}
	}

	async function handleOnSignUp(values, actions) {
		const { email, password } = values;
		try {
			await registerWithEmail(email, password);
		} catch (error) {
			setRegisterError(error.message);
		}
	}

	return (
		<SafeView style={styles.container}>
			<Form
				initialValues={{
					name: '',
					email: '',
					password: '',
					confirmPassword: '',
				}}
				validationSchema={validationSchema}
				onSubmit={(values) => handleOnSignUp(values)}
			>
				<FormField
					name="name"
					leftIcon="account"
					placeholder={i18n.t('register.enter-name')}
					autoFocus={true}
				/>
				<FormField
					name="email"
					leftIcon="email"
					placeholder={i18n.t('register.enter-email')}
					autoCapitalize="none"
					keyboardType="email-address"
					textContentType="emailAddress"
				/>
				<FormField
					name="password"
					leftIcon="lock"
					placeholder={i18n.t('register.enter-password')}
					autoCapitalize="none"
					autoCorrect={false}
					secureTextEntry={passwordVisibility}
					textContentType="password"
					rightIcon={rightIcon}
					handlePasswordVisibility={handlePasswordVisibility}
				/>
				<FormField
					name="confirmPassword"
					leftIcon="lock"
					placeholder={i18n.t('register.confirm-password')}
					autoCapitalize="none"
					autoCorrect={false}
					secureTextEntry={confirmPasswordVisibility}
					textContentType="password"
					rightIcon={confirmPasswordIcon}
					handlePasswordVisibility={handleConfirmPasswordVisibility}
				/>
				<FormButton title={i18n.t('welcome.register')} />
				{<FormErrorMessage error={registerError} visible={true} />}
			</Form>
			<IconButton
				style={styles.backButton}
				iconName="keyboard-backspace"
				color={Colors.white}
				size={30}
				onPress={() => navigation.goBack()}
			/>
		</SafeView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 15,
		backgroundColor: Colors.mediumGrey,
	},
	backButton: {
		justifyContent: 'center',
		alignItems: 'center',
		marginVertical: 10,
	},
});
