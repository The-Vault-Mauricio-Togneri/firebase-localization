function FormatXliff()
{
	this.toFile = function(language, translations)
	{
		var result = '<?xml version="1.0" encoding="utf-8"?>\n'
		result += '<xliff xmlns="urn:oasis:names:tc:xliff:document:1.2" version="1.2">\n'
		result += `\t<file original="global" datatype="plaintext" source-language="${language}" target-language="${language}">\n`
		result += '\t\t<body>\n'

		translations.forEach(translation =>
		{
			var description = ''

			if (translation.description)
			{
				description = ` extradata="${translation.description}"`
			}

			result += `\t\t\t<trans-unit id="${translation.key}"${description}>\n`
			result += `\t\t\t\t<source xml:lang="${language}">${translation.value}</source>\n`
			result += `\t\t\t\t<target xml:lang="${language}">${translation.value}</target>\n`
			result += `\t\t\t</trans-unit>\n`
		})

		result += '\t\t</body>\n'
		result += '\t</file>\n'
		result += '</xliff>'
	
		return result
	}

	this.fromFile = function(content)
	{
		return []
	}
}

module.exports = new FormatXliff()