function FormatJson()
{
	this.toFile = function(language, translations)
	{
		var result = {}

		translations.forEach(translation =>
		{
			result[translation.key] = translation.value
		})

		return JSON.stringify(result, null, 4)
	}

	this.fromFile = function(content)
	{
		return []
	}
}

module.exports = new FormatJson()