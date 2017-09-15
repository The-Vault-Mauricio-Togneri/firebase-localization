function DatabaseSegment(database)
{
	this.root = function(callback)
	{
		return database.ref('segments').once('value', snap =>
		{
			callback(snap)
		})
	}

	this.byLanguage = function(languageKey, callback)
	{
		return this.root(segments =>
		{
			var result = {}
			
			segments.forEach(entry =>
			{
				const segment = entry.val()

				result[segment.key] = segment.translations[languageKey].value
			})
	
			callback(result)
		})
	}
}

module.exports = DatabaseSegment