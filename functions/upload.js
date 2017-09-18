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
				
				if (translations)
				{
					return database.language.byCode(languageCode, language =>
					{
						if (language)
						{
							return database.language.root(languages =>
							{
								return database.segment.root(segments =>
								{
									if (segments.hasChildren())
									{
										for (const key in translations)
										{
											var segmentFound = false
											const value = translations[key]
	
											segments.forEach(segmentSnap =>
											{
												const segment = segmentSnap.val()

												if (segment.key == key)
												{
													// TODO
													segmentFound = true
												}
											})

											if (!segmentFound)
											{
												createSegment(key, value, language.key, languages)
											}
										}
									}
									else
									{
										for (const key in translations)
										{
											createSegment(key, translations[key], language.key, languages)
										}
									}

									response.status(200).send()
								})
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

	function createSegment(key, value, languageKey, languages)
	{
		const entry = {
			description: '',
			isArray: false,
			isPlural: false,
			key: key,
			maxLength: '',
			screenshot: '',
			translations: {}
		}

		languages.forEach(language =>
		{
			entry.translations[language.key] = {
				validated: false,
				value: ((language.key == languageKey) ? value : '')
			}
		})

		database.segment.push(entry)
	}
}

module.exports = Upload