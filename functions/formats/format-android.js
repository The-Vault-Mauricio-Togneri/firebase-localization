function FormatAndroid()
{
	const pixlxml = require('pixl-xml')

	this.toFile = function(language, translations)
	{
		var result = '<?xml version="1.0" encoding="utf-8"?>\n'
		result += '<resources>\n'
	
		for (const key in translations)
		{
			result += `\t<string name="${key}">${translations[key]}"</string>\n`
		}
	
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