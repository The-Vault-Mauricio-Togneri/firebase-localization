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
		this.languagesEntryRef(id).set(value, function(error)
		{
			database.logDatabaseResult(error, `Update language (${id}) => ${JSON.stringify(value)}`)
		})
	}

	this.removeLanguage = function(id)
	{
		this.languagesEntryRef(id).remove(function(error)
		{
			database.logDatabaseResult(error, `Remove language (${id})`)
		})
	}
})