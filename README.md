# Firebase Localization :fire:

**Firebase Localization** is a web based localization management tool specially design for mobile and web projects.

## Demo
If you want to try the online demo click [here](https://app-localization-2f645.firebaseapp.com)

User: `demo@email.com`
Password: `demouser`

## Requisites

1. Have a Google account [create](https://accounts.google.com/SignUp)
2. 

## Setting up Firebase



## Project configuration

Create the file `.firebaserc` with the following format:

```json
{
	"projects": {
		"default": "<PROJECT_ID>"
	}
}
```

Create the file `public/js/common/config.js` with the following format:

```javascript
const FIREBASE_CONFIG = {
	apiKey: '',
	authDomain: '',
	databaseURL: '',
	projectId: '',
	storageBucket: '',
	messagingSenderId: ''
}
```

Create the file `functions/config.js` with the following format:

```javascript
module.exports = {
	databaseURL: '',
	storageBucket: ''
}
```

## API

### Import

`https://myhost.com/api/import/:language/:format?token=xxx`

### Export

`https://myhost.com/api/export/:language/:format?token=xxx`

#### Formats

* android
* ios
* xliff
* json
* yaml

### Backup

`https://myhost.com/api/backup?token=xxx`