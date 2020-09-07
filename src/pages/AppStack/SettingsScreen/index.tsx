import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SettingsScreen from './SettingsScreen';

const Stack = createStackNavigator();

export default function SettingsStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Settings" component={SettingsScreen} />
		</Stack.Navigator>
	);
}
