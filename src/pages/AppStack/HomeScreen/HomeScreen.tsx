import React, { useContext } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Avatar } from 'react-native-elements';

import i18n from '../../../services/Translations';
import useStatusBar from '../../../hooks/useStatusBar';
import { AuthUserContext } from '../../AuthUserProvider';

export default function HomeScreen() {
	useStatusBar('dark-content');

	const { user, setUser } = useContext(AuthUserContext);

	return (
		<View style={styles.container}>
			<Avatar
				rounded
				size="large"
				source={{
					uri:
						user?.photoURL ??
						'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
				}}
			/>
			<Text>Welcome {user?.displayName}</Text>
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
