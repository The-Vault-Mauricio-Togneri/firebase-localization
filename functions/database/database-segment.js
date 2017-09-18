function DatabaseSegment(database)
{
	this.root = function(callback)
	{
		return database.ref('segments').once('value', callback)
	}

	this.push = function(segment)
	{
		return database.ref('segments').push(segment)
	}

	this.byLanguage = function(languageKey, callback)
	{
		return this.root(segments =>
		{
			var result = []
			
			segments.forEach(entry =>
			{
				const segment = entry.val()

				result.push({
					key: segment.key,
					value: segment.translations[languageKey].value,
					description: segment.description
				})
			})

			if (result.length > 0)
			{
				result = result.sort(function(a, b)
				{
					return (a.key < b.key) ? -1 : (a.key > b.key)
				})
			}
	
			callback(result)
		})
	}
}

module.exports = DatabaseSegment