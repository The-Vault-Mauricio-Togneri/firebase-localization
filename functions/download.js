function Download(database)
{
	this.process = function(request, response, fileName, exporter)
	{
		const languageCode = request.param('language')
		const tags = request.query.tags ? request.query.tags.split(',') : []
		
		return database.api.token(token =>
		{
			if (token === request.query.token)
			{
				return database.language.byCode(languageCode, language =>
				{
					if (language)
					{
						return database.segment.byLanguage(language.key, translations =>
						{
							const filteredTranslations = translations.filter(translation => hasTags(translation, tags))

							response.set('content-disposition', `attachment; filename="${fileName.replace('{language}', languageCode)}"`)
							response.send(exporter.toFile(languageCode, filteredTranslations))
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

	function hasTags(translation, tags)
	{
		if (tags.length == 0)
		{
			return true
		}

		var result = false

		tags.forEach(tag =>
		{
			if (translation.tags.includes(tag))
			{
				result = true
			}
		})

		return result
	}
}

module.exports = Download