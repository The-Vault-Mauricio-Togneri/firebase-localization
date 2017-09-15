app.service('databaseLanguage', function(database)
{
	this.rootLive = function(callback)
	{
		root().on('value', snap =>
		{	
			callback(fromSnap(snap))
		})
	}

	this.rootStatic = function(callback)
	{
		root().once('value', snap =>
		{	
			callback(fromSnap(snap))
		})
	}

	this.add = function(value)
	{
		return database.push('languages', value)
	}

	this.update = function(id, value)
	{
		return database.set(languagePath(id), value)
	}

	this.remove = function(id)
	{
		return database.remove(languagePath(id))
	}

	// =========================================================================

	function root()
	{
		return database.ref('languages')
	}

	function fromSnap(snap)
	{
		const languages = {}

		snap.forEach(function(entry)
		{
			languages[entry.key] = new Language(entry.key, entry.val())
		})

		return languages
	}

	function languagePath(languageId)
	{
		return `languages/${languageId}`
	}
})