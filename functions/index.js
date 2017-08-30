"use strict";

const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const generate = require('./export.js')
const app = express();

admin.initializeApp({
	credential: admin.credential.applicationDefault(),
	databaseURL: 'https://app-localization-2f645.firebaseio.com'
})

app.get('/export/:locale/android', (request, response) => {
	var locale = request.param('locale');

	response.set('content-disposition', `attachment; filename="strings-${locale}.xml"`)
	
	var dbRef = admin.database().ref('translations')

	return dbRef.once('value').then(function(snapshot) {
		response.send(generate.android(locale, snapshot.val()))
	})
});

app.get('/export/:locale/ios', (request, response) => {
	var locale = request.param('locale');

	response.set("content-disposition", `attachment; filename="Localizable-${locale}.strings"`)
	
	var dbRef = admin.database().ref('translations')

	return dbRef.once('value').then(function(snapshot) {
		response.send(generate.ios(locale, snapshot.val()))
	})
});

exports.api = functions.https.onRequest(app);

// https://github.com/firebase/functions-samples
// https://us-central1-app-localization-2f645.cloudfunctions.net/[function]
/*exports.example = functions.https.onRequest((request, response) => {
	response.json({property:123})
	console.log('this is a sample log')
})*/