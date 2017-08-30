module.exports = {
	
	android: function(locale, entries)
	{
		var result = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n"
		result += "<resources>\n"
	
		for (var entry in entries)
		{
			var value = entries[entry].locales[locale].value
			
			result += `\t<string name="${entry}">${value}"</string>\n`
		}
	
		result += "</resources>"
	
		return result
	},
	
    ios: function(locale, entries)
	{
		var result = ''
	
		for (var entry in entries)
		{
			var value = entries[entry].locales[locale].value
	
			result += `"${entry}" = "${value}";\n`
		}
	
		return result
	}
}