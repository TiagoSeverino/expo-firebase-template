import React, { useState, useEffect, useContext } from 'react';
import {
	View,
	StyleSheet,
	Button,
	Text,
	ScrollView,
	Switch,
} from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import {
	registerForPushNotificationsAsync,
	sendPushNotification,
} from '../../../services/Notifications';
import i18n from '../../../services/Translations';
import { countryCodeToFlag } from '../../../utils/countries';
import useStatusBar from '../../../hooks/useStatusBar';
import {
	logout,
	uploadAvatar,
	saveExpoPushToken,
} from '../../../services/Firebase';
import { AuthUserContext } from '../../AuthUserProvider';
import InfoText from '../../../components/Menu/InfoText';
import BaseIcon from '../../../components/Menu/Icon';
import Chevron from '../../../components/Menu/Chevron';

export default function HomeScreen() {
	useStatusBar('dark-content');

	const [expoPushToken, setExpoPushToken] = useState('');
	const { user, setUser } = useContext(AuthUserContext);

	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) => {
			if (!token) return;

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
		<ScrollView style={styles.scroll}>
			<View style={styles.userRow}>
				<View style={styles.userImage}>
					<Avatar
						rounded
						size="large"
						source={{
							uri:
								user?.photoURL ??
								'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
						}}
					/>
				</View>
				<View>
					<Text style={{ fontSize: 16 }}>{user?.displayName}</Text>
					<Text
						style={{
							color: 'gray',
							fontSize: 16,
						}}
					>
						{user?.email}
					</Text>
				</View>
			</View>
			<InfoText text="Account" />
			<View>
				<ListItem
					title={i18n.t('settings.push-notifications')}
					containerStyle={styles.listItemContainer}
					onPress={() =>
						sendPushNotification({
							to: expoPushToken,
							sound: 'default',
							title: 'Original Title',
							body: 'And here is the body!',
							data: { data: 'goes here' },
						})
					}
					rightElement={
						<Switch onValueChange={() => {}} value={true} />
					}
					leftIcon={
						<BaseIcon
							containerStyle={{
								backgroundColor: '#FFADF2',
							}}
							icon={{
								type: 'material',
								name: 'notifications',
							}}
						/>
					}
				/>
				<ListItem
					title={i18n.t('settings.upload-avatar')}
					containerStyle={styles.listItemContainer}
					onPress={_pickImage}
					leftIcon={
						<BaseIcon
							containerStyle={{
								backgroundColor: '#57DCE7',
							}}
							icon={{
								type: 'material',
								name: 'add-a-photo',
							}}
						/>
					}
					rightIcon={<Chevron />}
				/>
				<ListItem
					title={i18n.t('settings.language')}
					rightTitle={countryCodeToFlag(i18n.locale)}
					rightTitleStyle={{ fontSize: 15 }}
					onPress={() => {}}
					containerStyle={styles.listItemContainer}
					leftIcon={
						<BaseIcon
							containerStyle={{ backgroundColor: '#FAD291' }}
							icon={{
								type: 'material',
								name: 'language',
							}}
						/>
					}
					rightIcon={<Chevron />}
				/>
				<ListItem
					title={i18n.t('settings.sign-out')}
					onPress={handleSignOut}
					containerStyle={styles.listItemContainer}
					titleStyle={styles.logoutText}
				/>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scroll: {
		backgroundColor: 'white',
	},
	userRow: {
		alignItems: 'center',
		flexDirection: 'row',
		paddingBottom: 8,
		paddingLeft: 15,
		paddingRight: 15,
		paddingTop: 6,
	},
	userImage: {
		marginRight: 12,
	},
	listItemContainer: {
		height: 55,
		borderWidth: 0.5,
		borderColor: '#ECECEC',
	},
	logoutText: {
		color: '#007AFF',
		fontSize: 18,
		fontWeight: '400',
	},
});
