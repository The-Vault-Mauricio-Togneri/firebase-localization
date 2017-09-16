[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/mauriciotogneri/firebase-localization/blob/master/LICENSE.md)

# :fire: Firebase Localization :fire:

**Firebase Localization** is a web based localization management tool specially design for mobile and web projects.

## Demo
If you want to try the online demo click [here](https://app-localization-2f645.firebaseapp.com).

* User: `demo@email.com`
* Password: `demouser`

## How it works
The project is design to run on a Firebase instance. Simply check out the project, configure it with your settings and deploy it.

## Requisites

1. A **Google** account ([create](https://accounts.google.com/SignUp))
2. **node.js** (min: v6.3.1) ([install](https://nodejs.org/en/download))
3. **npm** ([install](https://www.npmjs.com/get-npm))
4. **Firebase CLI** ([docs](https://firebase.google.com/docs/cli))
	* `sudo npm install -g firebase-tools`

## Setting up Firebase
In order to follow these steps, you must be logged in with your Google account.

1. [Firebase console](https://console.firebase.google.com)
2. Checkout the project code: `git@github.com:mauriciotogneri/firebase-localization.git`
2. Login into Firebase: `firebase login`

X. Deploy: `firebase deploy`
Z. :boom: Boom! The tool is ready at: `https://<PROJECT_ID>.firebaseapp.com`

## Project configuration

Create the file `.firebaserc` in the root of the project with the following format:

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

`https://<PROJECT_ID>.firebaseapp.com/api/import/{language}/{format}?replace=[true|false]&token=[xxx]`

The body of the request must contain the content of the file to be uploaded.

### Export
To download a localization file in a particular format for a specific language.

`https://<PROJECT_ID>.firebaseapp.com/api/export/{language}/{format}?token=[xxx]`

#### Languages
Languages are described using:

* Two letter code using [ISO 639-1](https://en.wikipedia.org/wiki/ISO_639-1) to represent the language
* Two letter code using [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) to represent the region

For example:
* `en_US`: English, United States
* `es_ES`: Spanish, Spain
* `fr_CA`: French, Canada

#### Available Formats

* `android`
* `ios`
* `xliff`
* `json`
* `yaml`

### Backup
To perform a backup of the full database. The file will be stored in the **Cloud Storage for Firebase**. The name of the file will be a string representing the given date in the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format according to universal time.

`https://<PROJECT_ID>.firebaseapp.com/api/backup?token=[xxx]`

## License

    MIT License

    Copyright (c) 2017 Mauricio Togneri

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.