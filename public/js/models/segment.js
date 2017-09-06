function Segment(id, segment)
{
	this.id = id
	this.key = segment.key
	this.description = segment.description
	this.tags = segment.tags
	this.maxLength = segment.maxLength
	this.screenshot = segment.screenshot
	this.isPlural = segment.isPlural
	this.isArray = segment.isArray
	this.languages = segment.languages

	for (const index in this.languages)
	{
		this.languages[index].oldValue = this.languages[index].value
	}

	this.languageById = function(id)
	{
		for (const index in this.languages)
		{
			if (index == id)
			{
				return this.languages[index]
			}
		}

		return null
	}

	this.contains = function(text)
	{
		for (const index in this.languages)
		{
			if (this.languages[index].value.toLowerCase().includes(text))
			{
				return true	
			}
		}

		return this.key.toLowerCase().includes(text)
	}

	this.hasValidated = function()
	{
		for (const index in this.languages)
		{
			if (this.languages[index].validated)
			{
				return true	
			}
		}

		return false
	}

	this.hasNotValidated = function()
	{
		for (const index in this.languages)
		{
			if (!this.languages[index].validated)
			{
				return true	
			}
		}

		return false
	}

	this.hasTranslated = function()
	{
		for (const index in this.languages)
		{
			if (this.languages[index].value)
			{
				return true	
			}
		}

		return false
	}

	this.hasNotTranslated = function()
	{
		for (const index in this.languages)
		{
			if (!this.languages[index].value)
			{
				return true	
			}
		}

		return false
	}
}