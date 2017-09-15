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
		const parsed = pixlxml.parse(content).string

		var result = []

		parsed.forEach(entry =>
		{
			result[entry.name] = entry._Data
		})

		return result
	}
}

module.exports = new FormatAndroid()