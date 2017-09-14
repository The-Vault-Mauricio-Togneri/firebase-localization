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

	this.fromFile = function(content)
	{
		return []
	}
}

module.exports = new FormatJson()