import React, { useEffect } from 'react';
import { YellowBox } from 'react-native';
import Updates from 'expo-updates';

import Providers from './src/pages';

YellowBox.ignoreWarnings(['Setting a timer']);

export default function App() {
	useEffect(() => {
		async function updateApp() {
			try {
				const { isAvailable } = await Updates.checkForUpdateAsync();

				if (isAvailable) await Updates.fetchUpdateAsync();
			} catch (ex) {}
		}

		updateApp();
	}, []);

	return <Providers />;
}
