# expo-firebase-template 🔥

![Expo Publish](https://github.com/TiagoSeverino/expo-firebase-template/workflows/Expo%20Publish/badge.svg?branch=master)
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

## Installation

-   Clone this repo
-   Install dependencies: `npm install` or `yarn install`
-   Rename the file `example.firebaseConfig.js` to `firebaseConfig.js`
-   Make sure to add your own Firebase config in this file as shown below.

```js
// Rename this file to "firebaeConfig.js" before use
// Replace all Xs with real Firebase API keys

export default {
	apiKey: 'XXXX',
	authDomain: 'XXXX',
	databaseURL: 'XXXX',
	projectId: 'XXXX',
	storageBucket: 'XXXX',
	messagingSenderId: 'XXXX',
	appId: 'XXXX',
	facebookAppId: 'XXXX',
};
```

## Screens

Main screens:

-   Login
-   Signup
-   Forgot password

![Initial Welcome Screen](https://i.imgur.com/KJAzftx.gif)

![Successful Signup](https://i.imgur.com/Ih72jol.gif)

![Successful Login](https://i.imgur.com/Xp0tiI1.gif)

![Forgot Password](https://i.imgur.com/HDvQMfp.png)

<strong>Built by [@TiagoSeverino](https://github.com/TiagoSeverino)</strong>
