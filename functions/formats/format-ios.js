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
		var result = null

		try
		{
			content.split("\n").forEach(line =>
			{
				var input = line.trim()

				if ((!input.startsWith("/*")) && input.startsWith("\""))
				{
					const parts = input.split("=")
					const key   = parts[0].trim().substr(1).slice(0, -1)
					const value = parts[1].trim().substr(1).slice(0, -2)

					if (result == null)
					{
						result = {}
					}

					result[key] = value
				}
			})
		}
		catch(e)
		{
			console.log(e)

			result = null
		}

		return result
	}
}

module.exports = new FormatIOS()