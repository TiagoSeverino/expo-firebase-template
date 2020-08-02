import Constants from 'expo-constants';
import {
	setNotificationHandler,
	getExpoPushTokenAsync,
	setNotificationChannelAsync,
	AndroidImportance,
} from 'expo-notifications';
import { getAsync, askAsync, NOTIFICATIONS } from 'expo-permissions';
import { Platform } from 'react-native';

setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});

export interface IPushNotification {
	to: string;
	sound?: string;
	title: string;
	body: string;
	data?: object;
}

export const sendPushNotification = async ({
	to,
	sound = 'default',
	title,
	body,
	data,
}: IPushNotification) => {
	const message = {
		to,
		sound,
		title,
		body,
		data,
	} as IPushNotification;

	await fetch('https://exp.host/--/api/v2/push/send', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Accept-encoding': 'gzip, deflate',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(message),
	});
};

export const registerForPushNotificationsAsync = async (): Promise<
	string | undefined
> => {
	let token;
	if (Constants.isDevice) {
		const { status: existingStatus } = await getAsync(NOTIFICATIONS);
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await askAsync(NOTIFICATIONS);
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			alert('Failed to get push token for push notification!');
			return;
		}
		token = (await getExpoPushTokenAsync()).data;
		console.log(token);
	} else {
		alert('Must use physical device for Push Notifications');
	}

	if (Platform.OS === 'android') {
		setNotificationChannelAsync('default', {
			name: 'default',
			importance: AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}

	return token;
};
