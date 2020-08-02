import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Button, Text, Image } from 'react-native';

import {
	registerForPushNotificationsAsync,
	sendPushNotification,
} from '../../services/Notifications';
import i18n from '../../services/Translations';
import useStatusBar from '../../hooks/useStatusBar';
import { logout } from '../../services/Firebase/firebase';
import { AuthUserContext } from '../AuthUserProvider';

export default function HomeScreen() {
	useStatusBar('dark-content');

	const [expoPushToken, setExpoPushToken] = useState('');
	const { user } = useContext(AuthUserContext);

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
			<Image style={styles.avatar} source={{ uri: user?.photoURL }} />
			<Text>Welcome {user?.displayName}</Text>
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
	avatar: {
		width: 80,
		height: 80,
	},
});
