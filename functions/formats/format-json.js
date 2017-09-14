function FormatJson()
{
	this.toFile = function(language, translations)
	{
		return JSON.stringify(translations, null, 4)
	}

	this.fromFile = function(content)
	{
		return []
	}
}

module.exports = new FormatJson()