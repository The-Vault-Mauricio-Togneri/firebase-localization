"use strict"

const admin = require('firebase-admin')
admin.initializeApp({
	credential: admin.credential.applicationDefault(),
	databaseURL: 'https://app-localization-2f645.firebaseio.com'
})

const functions = require('firebase-functions')
const express   = require('express')
const generate  = require('./generate.js')
const trigger   = require('./trigger.js')
const app = express()

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

exports.onTranslationUpdated = functions.database.ref('/segments/{segmentId}/translations/{translationId}/value').onUpdate(event =>
{
	return trigger.onTranslationUpdated(event)
})

exports.onLanguageAdded = functions.database.ref('/languages/{languageId}').onCreate(event =>
{
	return trigger.onLanguageAdded(event, database, admin)
})

// https://github.com/firebase/functions-samples
// https://us-central1-app-localization-2f645.cloudfunctions.net/[function]