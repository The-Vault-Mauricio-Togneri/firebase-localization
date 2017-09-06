module.exports = {
	
	android: function(language, segments)
	{
		var result = `<?xml version="1.0" encoding="utf-8"?>\n`
		result += '<resources>\n'
	
		for (const index in segments)
		{
			const segment = segments[index]
			const key = segment.key
			const value = segment.translations[language].value
			
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
			const value = segment.translations[language].value
	
			result += `"${key}" = "${value}";\n`
		}
	
		return result
	}
}