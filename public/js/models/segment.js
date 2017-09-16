function Segment(id, data)
{
	this.id = id
	this.key = data.key
	this.description = data.description
	this.tags = (data.tags) ? data.tags : []
	this.maxLength = data.maxLength
	this.screenshot = data.screenshot
	this.isPlural = data.isPlural
	this.isArray = data.isArray
	this.created = data.created
	this.translations = {}

	for (const index in data.translations)
	{
		this.translations[index] = new Translation(index, data.translations[index])
	}

	this.update = function(segment)
	{
		this.id = segment.id
		this.key = segment.key
		this.description = segment.description
		this.tags = (segment.tags) ? segment.tags : []
		this.maxLength = segment.maxLength
		this.screenshot = segment.screenshot
		this.isPlural = segment.isPlural
		this.isArray = segment.isArray
		this.created = segment.created

		for (const index in segment.translations)
		{
			this.translations[index].update(new Translation(index, segment.translations[index]))
		}
	}

	this.translationById = function(id)
	{
		for (const index in this.translations)
		{
			if (index == id)
			{
				return this.translations[index]
			}
		}

		return null
	}

	this.contains = function(text, regex)
	{
		for (const index in this.translations)
		{
			if (this.textMatch(this.translations[index].value, text, regex))
			{
				return true	
			}
		}

		for (const index in this.tags)
		{
			if (this.textMatch(this.tags[index], text, regex))
			{
				return true	
			}
		}

		return this.textMatch(this.key, text, regex) || this.textMatch(this.description, text, regex)
	}

	this.textMatch = function(input, pattern, isRegex)
	{
		if (isRegex)
		{
			try
			{
				return (new RegExp(pattern)).test(input)
			}
			catch(e)
			{
				return false
			}
		}
		else
		{
			return input.toLowerCase().includes(pattern.toLowerCase())
		}
	}

	this.hasValidated = function()
	{
		for (const index in this.translations)
		{
			if (this.translations[index].validated)
			{
				return true	
			}
		}

		return false
	}

	this.hasNotValidated = function()
	{
		for (const index in this.translations)
		{
			if (!this.translations[index].validated)
			{
				return true	
			}
		}

		return false
	}

	this.hasTranslated = function()
	{
		for (const index in this.translations)
		{
			if (this.translations[index].value)
			{
				return true	
			}
		}

		return false
	}

	this.hasNotTranslated = function()
	{
		for (const index in this.translations)
		{
			if (!this.translations[index].value)
			{
				return true	
			}
		}

		return false
	}
}