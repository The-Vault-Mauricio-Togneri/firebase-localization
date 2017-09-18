function DatabaseLanguage(database)
{
	this.byCode = function(code, callback)
	{
		return database.ref('languages').once('value', snap =>
		{
			var result = null

			snap.forEach(entry =>
			{
				if (entry.val().code === code)
				{
					result = entry
				}
			})

			callback(result)
		})
	}

	this.root = function(callback)
	{
		return database.ref('languages').once('value', callback)
	}
}

module.exports = DatabaseLanguage