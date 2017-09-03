module.exports = {
	
	android: function(locale, translations)
	{
		var result = `<?xml version="1.0" encoding="utf-8"?>\n`
		result += '<resources>\n'
	
		for (const index in translations)
		{
			const translation = translations[index]
			const key = translation.key
			const value = translation.locales[locale].value
			
			result += `\t<string name="${key}">${value}"</string>\n`
		}
	
		result += '</resources>'
	
		return result
	},
	
    ios: function(locale, translations)
	{
		var result = ''
	
		for (const index in translations)
		{
			const translation = translations[index]
			const key = translation.key
			const value = translation.locales[locale].value
	
			result += `"${key}" = "${value}";\n`
		}
	
		return result
	}
}