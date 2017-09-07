app.service('databaseLanguage', function(database)
{
	this.ref = function()
	{
		return database.databaseRef().child('languages')
	}

	this.entryRef = function(id)
	{
		return database.databaseRef().child(`languages/${id}`)
	}

	this.fromSnap = function(snap)
	{
		const languages = {}

		snap.forEach(function(entry)
		{
			languages[entry.key] = new Language(entry.key, entry.val())
		})

		return languages
	}

	this.addLanguage = function(value)
	{
		this.ref().push(value, function(error)
		{
			database.logDatabaseResult(error, `Add language => ${JSON.stringify(value)}`)
		})
	}

	this.updateLanguage = function(id, value)
	{
		database.set(languagePath(id), value)
	}

	this.removeLanguage = function(id)
	{
		this.entryRef(id).remove(function(error)
		{
			database.logDatabaseResult(error, `Remove language (${id})`)
		})
	}

	function languagePath(languageId)
	{
		return `languages/${languageId}`
	}
})