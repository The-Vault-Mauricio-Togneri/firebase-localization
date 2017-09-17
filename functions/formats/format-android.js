function FormatAndroid()
{
	const pixlxml = require('pixl-xml')

	this.toFile = function(language, translations)
	{
		var result = '<?xml version="1.0" encoding="utf-8"?>\n'
		result += '<resources>\n\n'
	
		translations.forEach(translation =>
		{
			if (translation.description)
			{
				result += `\t<!-- ${translation.description} -->\n`
			}
			
			result += `\t<string name="${translation.key}">${sanitizeValue(translation.value)}</string>\n\n`
		})
	
		result += '</resources>'
	
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
		return value.replace(/'/g, "\\'").replace(/"/g, "\\\"")
	}

	this.fromFile = function(content)
	{
		var result = []

		try
		{
			const parsed = pixlxml.parse(content).string

			parsed.forEach(entry =>
			{
				result[entry.name] = entry._Data
			})
		}
		catch(e)
		{
			console.log(e)
		}

		return result
	}
}

module.exports = new FormatAndroid()