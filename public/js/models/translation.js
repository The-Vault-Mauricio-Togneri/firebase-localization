function Translation(id, translation)
{
	this.id = id
	this.key = translation.key
	this.description = translation.description
	this.tags = translation.tags
	this.maxLength = translation.maxLength
	this.screenshot = translation.screenshot
	this.isPlural = translation.isPlural
	this.isArray = translation.isArray
	this.locales = translation.locales

	for (const index in this.locales)
	{
		this.locales[index].oldValue = this.locales[index].value
	}

	this.contains = function(text)
	{
		for (const index in this.locales)
		{
			if (this.locales[index].value.toLowerCase().includes(text))
			{
				return true	
			}
		}

		return this.key.toLowerCase().includes(text)
	}

	this.hasValidated = function()
	{
		for (const index in this.locales)
		{
			if (this.locales[index].validated)
			{
				return true	
			}
		}

		return false
	}

	this.hasNotValidated = function()
	{
		for (const index in this.locales)
		{
			if (!this.locales[index].validated)
			{
				return true	
			}
		}

		return false
	}

	this.hasTranslated = function()
	{
		for (const index in this.locales)
		{
			if (this.locales[index].value)
			{
				return true	
			}
		}

		return false
	}

	this.hasNotTranslated = function()
	{
		for (const index in this.locales)
		{
			if (!this.locales[index].value)
			{
				return true	
			}
		}

		return false
	}
}