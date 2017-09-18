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
			
			result += `"${translation.key}" = "${sanitizeValue(translation.value)}";`
		})
	
		return result
	}

	function sanitizeValue(value)
	{
		return escapeString(setParameters(value))
	}

	function setParameters(value)
	{
		var result = value
		var index  = 1
		var REGEX  = /{{([^}}]*)}}/
		var match  = null

		while (match = REGEX.exec(result))
		{
			result = result.replace(REGEX, `%${index++}$${match[1]}`)

			if (index > 100)
			{
				break
			}
		}

		return result
	}

	function escapeString(value)
	{
		return value.replace(/"/g, "\\\"")
	}

	this.fromFile = function(content)
	{
		return []
	}
}

module.exports = new FormatIOS()