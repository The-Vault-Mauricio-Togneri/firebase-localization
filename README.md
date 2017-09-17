[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://github.com/mauriciotogneri/firebase-localization/blob/master/LICENSE.md)

# :fire: Firebase Localization :fire:

**Firebase Localization** is a web based localization management tool specially design for mobile and web projects. The project is design to run on a **Firebase** instance. Simply check out the project, configure it with your settings and deploy it.

![](https://i.imgur.com/8wKBooY.png)

## Demo
If you want to try the online demo click [here](https://app-localization-2f645.firebaseapp.com).

* User: `demo@email.com`
* Password: `demouser`

## Installation
To install **Firebase Localization** just follow the guide in the [wiki](https://github.com/mauriciotogneri/firebase-localization/wiki).

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

* `android` ([docs](https://developer.android.com/guide/topics/resources/string-resource.html))
* `ios` ([docs](https://developer.apple.com/library/content/documentation/MacOSX/Conceptual/BPInternational/MaintaingYourOwnStringsFiles/MaintaingYourOwnStringsFiles.html))
* `xliff` 1.2 ([docs](https://en.wikipedia.org/wiki/XLIFF))
* `json`
* `yaml`

### Backup
Used to perform a backup of the full database. The file will be stored in the **Cloud Storage for Firebase**. The name of the file will be a string representing the given date in the [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format according to universal time.

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