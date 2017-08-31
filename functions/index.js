"use strict";

const functions = require('firebase-functions')
const admin = require('firebase-admin')
const express = require('express')
const generate = require('./export.js')
const database = require('./database.js')
const app = express()

admin.initializeApp({
	credential: admin.credential.applicationDefault(),
	databaseURL: 'https://app-localization-2f645.firebaseio.com'
})

app.get('/export/:locale/android', (request, response) =>
{
	const localeCode = request.param('locale')

	database.localesRef(admin).once('value', localesSnap =>
	{
		var locale = database.localeByCode(localeCode, localesSnap)
		
		return database.translationsRef(admin).once('value', translationsSnap =>
		{
			response.set('content-disposition', `attachment; filename="strings-${localeCode}.xml"`)
			response.send(generate.android(locale.key, translationsSnap.val()))
		})
	})
})

app.get('/export/:locale/ios', (request, response) =>
{
	const localeCode = request.param('locale')
	
	database.localesRef(admin).once('value', localesSnap =>
	{
		var locale = database.localeByCode(localeCode, localesSnap)
		
		return database.translationsRef(admin).once('value', translationsSnap =>
		{
			response.set('content-disposition', `attachment; filename="Localizable-${localeCode}.strings"`)
			response.send(generate.ios(locale.key, translationsSnap.val()))
		})
	})
})

const api = express()
api.use('/api', app)

exports.api = functions.https.onRequest(api);

// https://github.com/firebase/functions-samples
// https://us-central1-app-localization-2f645.cloudfunctions.net/[function]
/*exports.example = functions.https.onRequest((request, response) => {
	response.json({property:123})
	console.log('this is a sample log')
})*/