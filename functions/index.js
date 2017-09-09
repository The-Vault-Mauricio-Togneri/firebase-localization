"use strict"

const functions = require('firebase-functions')
const express = require('express')
const generate = require('./generate.js')
const database = require('./database.js')
const app = express()

const admin = require('firebase-admin')
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

exports.onTranslationUpdated = functions.database.ref('/segments/{segmentId}/translations/{translationId}/value').onUpdate(event =>
{
	const entry = {
		value: event.data.previous.val(),
		author: event.auth.variable.email,
		date: Date.now()
	}
	
	return event.data.ref.parent.child('history').push(entry)
})

exports.onLanguageAdded = functions.database.ref('/languages/{languageId}').onCreate(event =>
{
	console.log('a')

	database.segmentsRef(admin).once('value', snap =>
	{
		console.log('b')

		snap.forEach(function(entry)
		{
			const value = {
				value: '',
				validated: false
			}

			console.log('c')

			database.ref(`/segments/${entry.key}/translations`).push(value)
		})
	})
})