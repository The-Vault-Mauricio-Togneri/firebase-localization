module.exports = {
	
	android: function(locale, translations)
	{
		var result = `<?xml version="1.0" encoding="utf-8"?>\n`
		result += '<resources>\n'
	
		for (var element in translations)
		{
			const translation = translations[element]
			const key = translation.code
			const value = translation.locales[locale].value
			
			result += `\t<string name="${key}">${value}"</string>\n`
		}
	
		result += '</resources>'
	
		return result
	},
	
    ios: function(locale, translations)
	{
		var result = ''
	
		for (var element in translations)
		{
			const translation = translations[element]
			const key = translation.code
			const value = translation.locales[locale].value
	
			result += `"${key}" = "${value}";\n`
		}
	
		return result
	}
}