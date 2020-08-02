import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import * as Yup from 'yup';

import i18n from '../../services/Translations';
import Colors from '../../utils/colors';
import SafeView from '../../components/SafeView';
import Form from '../../components/Forms/Form';
import FormField from '../../components/Forms/FormField';
import FormButton from '../../components/Forms/FormButton';
import IconButton from '../../components/IconButton';
import { loginWithEmail } from '../../services/Firebase/firebase';
import FormErrorMessage from '../../components/Forms/FormErrorMessage';
import useStatusBar from '../../hooks/useStatusBar';

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.required(i18n.t('login.registered-email'))
		.email()
		.label('Email'),
	password: Yup.string()
		.required()
		.min(6, i18n.t('register.pass-min', { n: 6 }))
		.label('Password'),
});

export default function LoginScreen({ navigation }) {
	useStatusBar('light-content');

	const [passwordVisibility, setPasswordVisibility] = useState(true);
	const [rightIcon, setRightIcon] = useState('eye');
	const [loginError, setLoginError] = useState('');

	function handlePasswordVisibility() {
		if (rightIcon === 'eye') {
			setRightIcon('eye-off');
			setPasswordVisibility(!passwordVisibility);
			console.log('eye-off');
		} else if (rightIcon === 'eye-off') {
			setRightIcon('eye');
			setPasswordVisibility(!passwordVisibility);
			console.log('eye-on');
		}
	}

	async function handleOnLogin(values) {
		const { email, password } = values;

		try {
			await loginWithEmail(email, password);
		} catch (error) {
			setLoginError(error.message);
		}
	}

	return (
		<SafeView style={styles.container}>
			<Form
				initialValues={{ email: '', password: '' }}
				validationSchema={validationSchema}
				onSubmit={(values) => handleOnLogin(values)}
			>
				<FormField
					name="email"
					leftIcon="email"
					placeholder={i18n.t('register.enter-email')}
					autoCapitalize="none"
					keyboardType="email-address"
					textContentType="emailAddress"
					autoFocus={true}
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
				<FormButton title={i18n.t('welcome.login')} />
				{<FormErrorMessage error={loginError} visible={true} />}
			</Form>
			<View style={styles.footerButtonContainer}>
				<TouchableOpacity
					onPress={() => navigation.navigate('ForgotPassword')}
				>
					<Text style={styles.forgotPasswordButtonText}>
						{i18n.t('login.forgot-password')}
					</Text>
				</TouchableOpacity>
			</View>
			<IconButton
				style={styles.backButton}
				iconName="keyboard-backspace"
				color="#fff"
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
	footerButtonContainer: {
		marginVertical: 15,
		justifyContent: 'center',
		alignItems: 'center',
	},
	forgotPasswordButtonText: {
		color: Colors.white,
		fontSize: 18,
		fontWeight: '600',
	},
	backButton: {
		justifyContent: 'center',
		alignItems: 'center',
	},
});
