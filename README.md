# expo-firebase-template 🔥

![Expo Publish](https://github.com/TiagoSeverino/expo-firebase-template/workflows/Expo%20Publish/badge.svg?branch=master)
[![GitHub issues](https://img.shields.io/github/issues/TiagoSeverino/expo-firebase-template)](https://github.com/TiagoSeverino/expo-firebase-template/issues)
[![GitHub forks](https://img.shields.io/github/forks/TiagoSeverino/expo-firebase-template)](https://github.com/TiagoSeverino/expo-firebase-template/network)
[![GitHub stars](https://img.shields.io/github/stars/TiagoSeverino/expo-firebase-template)](https://github.com/TiagoSeverino/expo-firebase-template/stargazers)

<p>
  <!-- iOS -->
  <img alt="Supports Expo iOS" longdesc="Supports Expo iOS" src="https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff" />
  <!-- Android -->
  <img alt="Supports Expo Android" longdesc="Supports Expo Android" src="https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff" />  
</p>

Is a quicker way to start with Expo + Firebase projects. It includes:

-   Based on Expo SDK `38.x.x`
-   Navigation using `react-navigation` 5.x.x
-   Firebase as backend for email and facebook auth
-   Over-the-air updates
-   Multi-language support using i18n-js
-   Automatic app review and publish using Github Actions
-   Custom and reusable form components
-   Handles different field types in forms
-   Handles server errors using Formik
-   Login/Signup form built using Formik & yup
-   Show/hide Password Field's visibility 👁
-   Uses Context API & checks user's auth state
-   Implement Password Reset Screen
-   All components are now functional components and use [React Hooks](https://reactjs.org/docs/hooks-intro.html)


## Find it on Expo
https://expo.io/@tiagoseverino/expo-firebase-template

## Installation

-   Clone this repo
-   Install dependencies: `npm install` or `yarn install`
-   Copy [google-services.json](https://docs.expo.io/push-notifications/using-fcm/) file to your project folder
-   Rename the file `config.example.ts` to `config.ts`
-   Make sure to add your own config in this file as shown below.

```js
// Rename this file to "config.ts" before use

export default {
	// Replace all XXXXs with real Firebase API keys
	firebase: {
		apiKey: 'XXXX',
		authDomain: 'XXXX',
		databaseURL: 'XXXX',
		projectId: 'XXXX',
		storageBucket: 'XXXX',
		messagingSenderId: 'XXXX',
		appId: 'XXXX',
		facebookAppId: 'XXXX',
	},
};
```

### Github Actions Secrets

Here is a summary of all the variables that you can use and their purpose.

variable              | description
---                   | ---
`EXPO_CLI_USERNAME`   | The username of your Expo account
`EXPO_CLI_PASSWORD`   | The password of your Expo account
`CONFIG_URL`          | The url of your config.ts
`GOOGLE_SERVICES`     | The url of your google-services.json


<strong>Built by [@TiagoSeverino](https://github.com/TiagoSeverino)</strong>
