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

	this.languagesEntryRef = function(id)
	{
		return databaseRef().child('languages/' + id)
	}

	this.languagesRef = function()
	{
		return databaseRef().child('languages')
	}

	this.languagesFromSnap = function(snap)
	{
		const languages = {}

		snap.forEach(function(entry)
		{
			languages[entry.key] = new Language(entry.key, entry.val())
		})

		return languages
	}

	this.addLanguageRef = function(value)
	{
		this.languagesRef().push(value, function(error)
		{
			logDatabaseResult(error, 'Add language => ' + JSON.stringify(value))
		})
	}

	this.updateLanguageRef = function(id, value)
	{
		this.languagesEntryRef(id).set(value, function(error)
		{
			logDatabaseResult(error, 'Update language (' + id + ') => ' + JSON.stringify(value))
		})
	}

	this.removeLanguageRef = function(id)
	{
		this.languagesEntryRef(id).remove(function(error)
		{
			logDatabaseResult(error, 'Remove language (' + id + ')')
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
		const translations = []

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