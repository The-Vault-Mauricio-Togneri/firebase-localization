function Generate(databaseConfig)
{
	const database = databaseConfig

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

	this.exportFile = function(request, response, fileName, exporter)
	{
		const languageCode = request.param('language')
		const token = request.query.token
		
		return database.apiToken().once('value', tokenSnap =>
		{
			if (tokenSnap.val() == token)
			{
				database.languages().once('value', languagesSnap =>
				{
					const language = database.languageByCode(languageCode, languagesSnap)
				
					if (language)
					{
						database.segments().once('value', segmentsSnap =>
						{
							response.set('content-disposition', `attachment; filename="${fileName.replace('{language}', languageCode)}"`)
							response.send(exporter(language, segmentsSnap.val()))
						})
					}
					else
					{
						response.status(400).send();
					}
				})	
			}
			else
			{
				response.status(400).send();
			}
		})
	}

	this.android = function(language, segments)
	{
		const translations = translationsByLanguage(language, segments)

		var result = '<?xml version="1.0" encoding="utf-8"?>\n'
		result += '<resources>\n'
	
		for (const key in translations)
		{
			result += `\t<string name="${key}">${translations[key]}"</string>\n`
		}
	
		result += '</resources>'
	
		return result
	}

	this.ios = function(language, segments)
	{
		const translations = translationsByLanguage(language, segments)

		var result = ''
	
		for (const key in translations)
		{
			result += `"${key}" = "${translations[key]}";\n`
		}
	
		return result
	}
	
    this.xliff = function(language, segments)
	{
		const translations = translationsByLanguage(language, segments)
		const languageCode = language.val().code

		var result = '<?xml version="1.0" encoding="utf-8"?>\n'
		result += '<xliff xmlns="urn:oasis:names:tc:xliff:document:1.2" version="1.2">\n'
		result += `\t<file original="global" datatype="plaintext" source-language="${languageCode}" target-language="${languageCode}">\n`
		result += '\t\t<body>\n'

		for (const key in translations)
		{
			result += `\t\t\t<trans-unit id="${key}">\n`
			result += `\t\t\t\t<source xml:lang="${languageCode}">${translations[key]}</source>\n`
			result += `\t\t\t\t<target xml:lang="${languageCode}">${translations[key]}</target>\n`
			result += `\t\t\t</trans-unit>\n`
		}
	
		result += '\t\t</body>\n'
		result += '\t</file>\n'
		result += '</xliff>'
	
		return result
	}
	
    this.json = function(language, segments)
	{
		const translations = translationsByLanguage(language, segments)

		return JSON.stringify(translations, null, 4)
	}
	
    this.yaml = function(language, segments)
	{
		const translations = translationsByLanguage(language, segments)

		var result = ''
	
		for (const key in translations)
		{
			result += `${key}: ${translations[key]}\n`
		}

		return result
	}
}

module.exports = Generate