import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, Button, Text, Image } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import {
	registerForPushNotificationsAsync,
	sendPushNotification,
} from '../../services/Notifications';
import i18n from '../../services/Translations';
import useStatusBar from '../../hooks/useStatusBar';
import {
	logout,
	saveExpoPushToken,
	uploadAvatar,
} from '../../services/Firebase';
import { AuthUserContext } from '../AuthUserProvider';

export default function HomeScreen() {
	useStatusBar('dark-content');

	const [expoPushToken, setExpoPushToken] = useState('');
	const { user, setUser } = useContext(AuthUserContext);

	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) => {
			setExpoPushToken(token);
			saveExpoPushToken(token);
		});
	}, []);

	async function handleSignOut() {
		try {
			await logout();
		} catch (error) {
			console.log(error);
		}
	}

	async function getPermissionAsync() {
		if (Constants.platform?.ios) {
			const { status } = await Permissions.askAsync(
				Permissions.CAMERA_ROLL
			);
			if (status !== 'granted') {
				alert(
					'Sorry, we need camera roll permissions to make this work!'
				);
			}
		}
	}

	async function _pickImage() {
		try {
			await getPermissionAsync();

			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [1, 1],
				quality: 0.8,
			});
			if (!result.cancelled) {
				const response = await fetch(result.uri);
				const blob = await response.blob();

				uploadAvatar(blob, result.uri, (new_user) => {
					setUser(new_user);
					forceUpdate();
				});
			}
		} catch {}
	}

	return (
		<View style={styles.container}>
			<Image
				style={styles.avatar}
				source={{
					uri:
						user?.photoURL ??
						'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
				}}
			/>
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
			<Button title={i18n.t('home.upload-avatar')} onPress={_pickImage} />
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
