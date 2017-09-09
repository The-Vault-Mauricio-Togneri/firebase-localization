"use strict"

const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const generate = require('./generate.js')
const database = require('./database.js')
const app = express()

admin.initializeApp({
	credential: admin.credential.applicationDefault(),
	databaseURL: 'https://app-localization-2f645.firebaseio.com'
})

app.get('/export/:language/android', (request, response) =>
{
	generate.exportFile(request, response, admin, 'strings-{language}.xml', generate.android)
})

app.get('/export/:language/ios', (request, response) =>
{
	generate.exportFile(request, response, admin, 'Localizable-{language}.strings', generate.ios)
})

app.get('/export/:language/xliff', (request, response) =>
{
	generate.exportFile(request, response, admin, '{language}.xlf', generate.xliff)
})

app.get('/export/:language/json', (request, response) =>
{
	generate.exportFile(request, response, admin, '{language}.json', generate.json)
})

app.get('/export/:language/yaml', (request, response) =>
{
	generate.exportFile(request, response, admin, '{language}.yaml', generate.yaml)
})

const api = express()
api.use('/api', app)

exports.api = functions.https.onRequest(api)

// https://github.com/firebase/functions-samples
// https://us-central1-app-localization-2f645.cloudfunctions.net/[function]
/*exports.example = functions.https.onRequest((request, response) =>
{
	response.json({property:123})
})*/

exports.addHistory = functions.database.ref('/segments/{segmentId}/translations/{translationId}/value').onUpdate(event =>
{
	const entry = {
		value: event.data.previous.val(),
		author: event.auth.variable.email,
		date: Date.now()
	}
	
	return event.data.ref.parent.child('history').push(entry)
})