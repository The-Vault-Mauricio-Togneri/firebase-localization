function FormatJson()
{
	this.toFile = function(language, translations)
	{
		var result = ''
		
		for (const key in translations)
		{
			result += `${key}: ${translations[key]}\n`
		}

		return result
	}
}

module.exports = new FormatJson()