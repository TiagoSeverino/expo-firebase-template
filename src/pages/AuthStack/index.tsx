import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from './WelcomeScreen';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
	return (
		<Stack.Navigator initialRouteName="Welcome" headerMode="none">
			<Stack.Screen name="Welcome" component={WelcomeScreen} />
			<Stack.Screen name="Login" component={LoginScreen} />
			<Stack.Screen name="Register" component={RegisterScreen} />
			<Stack.Screen
				name="ForgotPassword"
				component={ForgotPasswordScreen}
			/>
		</Stack.Navigator>
	);
}
