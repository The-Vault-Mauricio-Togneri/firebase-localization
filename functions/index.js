'use strict'

const config = require('./config.js')

const admin = require('firebase-admin')
admin.initializeApp({
	credential: admin.credential.applicationDefault(),
	databaseURL: config.databaseURL,
	storageBucket: config.storageBucket
})

const functions = require('firebase-functions')
const express   = require('express')
const database  = new (require('./database.js'))(admin)
const storage   = new (require('./storage.js'))(admin)
const trigger   = new (require('./trigger.js'))(database)
const backup    = new (require('./backup.js'))(storage, database)
const download  = new (require('./download.js'))(database)
const upload    = new (require('./upload.js'))(database)
const app = express()

app.post('/backup', (request, response) =>
{
	return backup.process(request, response)
})

app.get('/export/:language/android', (request, response) =>
{
	return download.process(request, response, 'strings-{language}.xml', download.android)
})

app.get('/export/:language/ios', (request, response) =>
{
	return download.process(request, response, 'Localizable-{language}.strings', download.ios)
})

app.get('/export/:language/xliff', (request, response) =>
{
	return download.process(request, response, '{language}.xlf', download.xliff)
})

app.get('/export/:language/json', (request, response) =>
{
	return download.process(request, response, '{language}.json', download.json)
})

app.get('/export/:language/yaml', (request, response) =>
{
	return download.process(request, response, '{language}.yaml', download.yaml)
})

app.put('/import/:language/android', (request, response) =>
{
	return upload.process(request, response, upload.android)
})

const api = express()
api.use('/api', app)

exports.api = functions.https.onRequest(api)

exports.onSegmentCreated = functions.database.ref('segments/{segmentId}').onCreate(event =>
{
	return trigger.onSegmentCreated(event)
})

exports.onTranslationUpdated = functions.database.ref('segments/{segmentId}/translations/{translationId}/value').onUpdate(event =>
{
	return trigger.onTranslationUpdated(event)
})

exports.onLanguageAdded = functions.database.ref('languages/{languageId}').onCreate(event =>
{
	return trigger.onLanguageAdded(event)
})

exports.onLanguageRemoved = functions.database.ref('languages/{languageId}').onDelete(event =>
{
	return trigger.onLanguageRemoved(event)
})