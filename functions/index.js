"use strict";

const functions = require('firebase-functions');

// https://github.com/firebase/functions-samples
// https://us-central1-app-localization-2f645.cloudfunctions.net/[function]
exports.test = functions.https.onRequest((request, response) => {
	response.json({property:123});
	console.log('this is a sample log')
});