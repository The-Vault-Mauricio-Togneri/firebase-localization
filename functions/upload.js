function Upload(database)
{
	this.process = function(request, response, importer)
	{
		const languageCode = request.param('language')
		
		return database.api.token(token =>
		{
			if (token === request.query.token)
			{
				const replace = request.query.replace === true
				const translations = importer.fromFile(request.body)
				
				if (translations && translations.length)
				{
					return database.language.byCode(languageCode, language =>
					{
						if (language)
						{
							return database.segment.root(segments =>
							{
								if (segments)
								{
									for (const key in translations)
									{
										const value = translations[key]

										segments.forEach(segment =>
										{
											if (segment)
											{
												// TODO
											}
											else
											{
												// TODO: create segment
											}
										})
									}
								}
								else
								{
									for (const key in translations)
									{
										const value = translations[key]

										// TODO: create segment
									}
								}
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
			}
			else
			{
				response.status(400).send()
			}
		})
	}
}

module.exports = Upload