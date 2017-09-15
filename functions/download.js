function Download(database)
{
	this.process = function(request, response, fileName, exporter)
	{
		const languageCode = request.param('language')
		
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