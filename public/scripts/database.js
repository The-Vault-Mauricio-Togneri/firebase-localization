app.service('database', function()
{
	function databaseRef()
	{
		return firebase.database().ref()
	}

	function logDatabaseResult(error, label)
	{
		if (error)
		{
			console.log(label + ': FAILED: ' + error)
		}
		else
		{
			console.log(label + ': OK')
		}
	}

	// -------------------------------

	this.localesEntryRef = function(id)
	{
		return databaseRef().child('locales/' + id)
	}

	this.localesRef = function()
	{
		return databaseRef().child('locales')
	}

	this.localesFromSnap = function(snap)
	{
		var locales = {}

		snap.forEach(function(entry)
		{
			locales[entry.key] = new Locale(entry.key, entry.val())
		})

		return locales
	}

	this.addLocaleRef = function(value)
	{
		this.localesRef().push(value, function(error)
		{
			logDatabaseResult(error, 'Add locale => ' + JSON.stringify(value))
		})
	}

	this.updateLocaleRef = function(id, value)
	{
		this.localesEntryRef(id).set(value, function(error)
		{
			logDatabaseResult(error, 'Update locale (' + id + ') => ' + JSON.stringify(value))
		})
	}

	this.removeLocaleRef = function(id)
	{
		this.localesEntryRef(id).remove(function(error)
		{
			logDatabaseResult(error, 'Remove locale (' + id + ')')
		})
	}

	// -------------------------------

	this.translationsEntryRef = function(id)
	{
		return databaseRef().child('/translations/' + id)
	}

	this.translationsRef = function()
	{
		return databaseRef().child('translations')
	}

	this.translationsFromSnap = function(snap)
	{
		var translations = []

		snap.forEach(function(entry)
		{
			translations.push(new Translation(entry.key, entry.val()))
		})

		return translations
	}

	this.addTranslationRef = function(value)
	{
		return this.translationsRef().push(value, function(error)
		{
			logDatabaseResult(error, 'Add translation => ' + JSON.stringify(value))
		})
	}

	this.updateTranslationRef = function(id, value)
	{
		this.translationsEntryRef(id).set(value, function(error)
		{
			logDatabaseResult(error, 'Update translation (' + id + ') => ' + JSON.stringify(value))
		})
	}

	this.removeTranslationRef = function(id)
	{
		this.translationsEntryRef(id).remove(function(error)
		{
			logDatabaseResult(error, 'Remove translation (' + id + ')')
		})
	}

	// -------------------------------

	this.apiTokenRef = function()
	{
		return databaseRef().child('api/token')
	}
})