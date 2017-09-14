# Firebase localization

[DEMO](https://app-localization-2f645.firebaseapp.com)

## Configuration

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