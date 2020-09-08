import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import '../../services/Notifications';
import HomeScreen from './HomeScreen';
import SettingsScreen from './SettingsScreen';

const Tab = createBottomTabNavigator();

export default function AppStack() {
	return (
		<Tab.Navigator initialRouteName="Home">
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<MaterialIcons
							name={'home'}
							size={26}
							style={{ color: focused ? 'black' : 'grey' }}
						/>
					),
				}}
			/>
			<Tab.Screen
				name="Settings"
				component={SettingsScreen}
				options={{
					tabBarIcon: ({ focused }) => (
						<MaterialIcons
							name={'settings'}
							size={26}
							style={{ color: focused ? 'black' : 'grey' }}
						/>
					),
				}}
			/>
		</Tab.Navigator>
	);
}
