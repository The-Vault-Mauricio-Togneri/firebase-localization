function FormatXliff()
{
	this.toFile = function(language, translations)
	{
		var result = '<?xml version="1.0" encoding="utf-8"?>\n'
		result += '<xliff xmlns="urn:oasis:names:tc:xliff:document:1.2" version="1.2">\n'
		result += `\t<file original="global" datatype="plaintext" source-language="${language}" target-language="${language}">\n`
		result += '\t\t<body>\n'

		for (const key in translations)
		{
			result += `\t\t\t<trans-unit id="${key}">\n`
			result += `\t\t\t\t<source xml:lang="${language}">${translations[key]}</source>\n`
			result += `\t\t\t\t<target xml:lang="${language}">${translations[key]}</target>\n`
			result += `\t\t\t</trans-unit>\n`
		}
	
		result += '\t\t</body>\n'
		result += '\t</file>\n'
		result += '</xliff>'
	
		return result
	}
}

module.exports = new FormatXliff()