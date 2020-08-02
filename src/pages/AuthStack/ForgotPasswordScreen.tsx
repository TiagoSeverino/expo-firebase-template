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
import { passwordReset } from '../../services/Firebase/firebase';
import FormErrorMessage from '../../components/Forms/FormErrorMessage';
import useStatusBar from '../../hooks/useStatusBar';

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.label('Email')
		.email(i18n.t('register.enter-email'))
		.required(i18n.t('login.registered-email-email')),
});

export default function ForgotPasswordScreen({ navigation }) {
	useStatusBar('light-content');

	const [customError, setCustomError] = useState('');

	async function handlePasswordReset(values) {
		const { email } = values;

		try {
			await passwordReset(email);
			navigation.navigate('Welcome');
		} catch (error) {
			setCustomError(error.message);
		}
	}

	return (
		<SafeView style={styles.container}>
			<Form
				initialValues={{ email: '' }}
				validationSchema={validationSchema}
				onSubmit={(values) => handlePasswordReset(values)}
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
				<FormButton title={i18n.t('forgot-password.forgot-password')} />
				{<FormErrorMessage error={customError} visible={true} />}
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
