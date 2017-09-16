function FormatAndroid()
{
	const pixlxml = require('pixl-xml')

	this.toFile = function(language, translations)
	{
		var result = '<?xml version="1.0" encoding="utf-8"?>\n'
		result += '<resources>\n\n'
	
		translations.forEach(translation =>
		{
			if (translation.description)
			{
				result += `\t<!-- ${translation.description} -->\n`
			}
			
			result += `\t<string name="${translation.key}">${translation.value}"</string>\n\n`
		})
	
		result += '</resources>'
	
		return result
	}

	this.fromFile = function(content)
	{
		var result = []

		try
		{
			const parsed = pixlxml.parse(content).string

			parsed.forEach(entry =>
			{
				result[entry.name] = entry._Data
			})
		}
		catch(e)
		{
			console.log(e)
		}

		return result
	}
}

module.exports = new FormatAndroid()