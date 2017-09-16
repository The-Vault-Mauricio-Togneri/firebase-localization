function FormatIOS()
{
	this.toFile = function(language, translations)
	{
		var result = ''
		
		translations.forEach(translation =>
		{
			if (result != '')
			{
				result += '\n\n'
			}

			if (translation.description)
			{
				result += `/* ${translation.description} */\n`	
			}
			
			result += `"${translation.key}" = "${translation.value}";`
		})
	
		return result
	}

	this.fromFile = function(content)
	{
		return []
	}
}

module.exports = new FormatIOS()