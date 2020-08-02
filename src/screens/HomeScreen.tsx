import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Text, Platform } from 'react-native';

import {
	registerForPushNotificationsAsync,
	sendPushNotification,
} from '../components/Notifications';
import i18n from '../components/Translations';
import useStatusBar from '../hooks/useStatusBar';
import { logout } from '../components/Firebase/firebase';

export default function HomeScreen() {
	useStatusBar('dark-content');

	const [expoPushToken, setExpoPushToken] = useState('');

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) => {
			setExpoPushToken(token);
		});
	}, []);

	async function handleSignOut() {
		try {
			await logout();
		} catch (error) {
			console.log(error);
		}
	}
	return (
		<View style={styles.container}>
			<Text>Your expo push token: {expoPushToken}</Text>
			<Button
				title={'Send Push Notification'}
				onPress={() =>
					sendPushNotification({
						to: expoPushToken,
						sound: 'default',
						title: 'Original Title',
						body: 'And here is the body!',
						data: { data: 'goes here' },
					})
				}
			/>
			<Button title={i18n.t('home.sign-out')} onPress={handleSignOut} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
