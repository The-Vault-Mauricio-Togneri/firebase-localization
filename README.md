# :fire: Firebase Localization :fire:

**Firebase Localization** is a web based localization management tool specially design for mobile and web projects.

## Demo
If you want to try the online demo click [here](https://app-localization-2f645.firebaseapp.com).

* User: `demo@email.com`
* Password: `demouser`

## Requisites

1. A **Google** account ([create](https://accounts.google.com/SignUp))
2. **NodeJS** installed
3. ?

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
The backend exposes some end points in order to peform operations outside of the web tool. All the end points require the **API token** as a query parameter.

### Import
To upload content from a local file. Usually used to populate the database for the first time.

`https://<PROJECT_ID>.firebaseapp.com/api/import/:language/:format?replace=[true|false]&token=[xxx]`

The body of the request must contain the content of the file to be uploaded.

### Export
To download a localization file in a particular format for a specific language.

`https://<PROJECT_ID>.firebaseapp.com/api/export/:language/:format?token=[xxx]`

#### Available Formats

* `android`
* `ios`
* `xliff`
* `json`
* `yaml`

### Backup
To perform a backup of the full database. The file will be stored in the **Google Cloud Storage** (accessible from Firebase). The name of the file will be a string representing the given date in the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format according to universal time.

`https://<PROJECT_ID>.firebaseapp.com/api/backup?token=[xxx]`