module.exports = {
	
	android: function(language, segments)
	{
		var result = '<?xml version="1.0" encoding="utf-8"?>\n'
		result += '<resources>\n'
	
		for (const index in segments)
		{
			const segment = segments[index]
			const key = segment.key
			const value = segment.translations[language.key].value
			
			result += `\t<string name="${key}">${value}"</string>\n`
		}
	
		result += '</resources>'
	
		return result
	},
	
    ios: function(language, segments)
	{
		var result = ''
	
		for (const index in segments)
		{
			const segment = segments[index]
			const key = segment.key
			const value = segment.translations[language.key].value
	
			result += `"${key}" = "${value}";\n`
		}
	
		return result
	},
	
    xliff: function(language, segments)
	{
		const languageCode = language.val().code

		var result = '<?xml version="1.0" encoding="utf-8"?>\n'
		result += '<xliff xmlns="urn:oasis:names:tc:xliff:document:1.2" version="1.2">\n'
		result += `\t<file original="global" datatype="plaintext" source-language="${languageCode}" target-language="${languageCode}">\n`
		result += '\t\t<body>\n'

		for (const index in segments)
		{
			const segment = segments[index]
			const key = segment.key
			const value = segment.translations[language.key].value

			result += `\t\t\t<trans-unit id="${key}">\n`
			result += `\t\t\t\t<source xml:lang="${languageCode}">${value}</source>\n`
			result += `\t\t\t\t<target xml:lang="${languageCode}">${value}</target>\n`
			result += `\t\t\t</trans-unit>\n`
		}
	
		result += '\t\t</body>\n'
		result += '\t</file>\n'
		result += '</xliff>'
	
		return result
	}
}