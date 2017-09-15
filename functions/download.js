function Download(database)
{
	function translationsByLanguage(language, segments)
	{
		var result = {}
		
		for (const index in segments)
		{
			const key = segments[index].key
			const value = segments[index].translations[language.key].value
	
			result[key] = value
		}

		return result
	}

	this.process = function(request, response, fileName, exporter)
	{
		const languageCode = request.param('language')
		
		return database.api.token(token =>
		{
			if (token === request.query.token)
			{
				return database.languages().once('value', languagesSnap =>
				{
					const language = database.languageByCode(languageCode, languagesSnap)
				
					if (language)
					{
						return database.segments().once('value', segmentsSnap =>
						{
							const translations = translationsByLanguage(language, segmentsSnap.val())

							response.set('content-disposition', `attachment; filename="${fileName.replace('{language}', languageCode)}"`)
							response.send(exporter.toFile(languageCode, translations))
						})
					}
					else
					{
						response.status(400).send()
					}
				})	
			}
			else
			{
				response.status(400).send()
			}
		})
	}
}

module.exports = Download