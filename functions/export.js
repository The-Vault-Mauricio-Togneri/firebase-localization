module.exports = {
	
	android: function(language, translations)
	{
		var result = `<?xml version="1.0" encoding="utf-8"?>\n`
		result += '<resources>\n'
	
		for (const index in translations)
		{
			const translation = translations[index]
			const key = translation.key
			const value = translation.languages[language].value
			
			result += `\t<string name="${key}">${value}"</string>\n`
		}
	
		result += '</resources>'
	
		return result
	},
	
    ios: function(language, translations)
	{
		var result = ''
	
		for (const index in translations)
		{
			const translation = translations[index]
			const key = translation.key
			const value = translation.languages[language].value
	
			result += `"${key}" = "${value}";\n`
		}
	
		return result
	}
}