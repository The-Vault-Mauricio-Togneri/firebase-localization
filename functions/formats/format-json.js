function FormatJson()
{
	this.toFile = function(language, translations)
	{
		return JSON.stringify(translations, null, 4)
	}
}

module.exports = new FormatJson()