import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

import i18n from '../components/Translations';
import useStatusBar from '../hooks/useStatusBar';
import { logout } from '../components/Firebase/firebase';

export default function HomeScreen() {
	useStatusBar('dark-content');
	async function handleSignOut() {
		try {
			await logout();
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<View style={styles.container}>
			<Button title={i18n.t('home.sign-out')} onPress={handleSignOut} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
