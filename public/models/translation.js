function Translation(key, translation)
{
	this.key = key
	this.code = translation.code
	this.description = translation.description
	this.locales = translation.locales

	this.hasValidated = function()
	{
		for (var index in this.locales)
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
		for (var index in this.locales)
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
		for (var index in this.locales)
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
		for (var index in this.locales)
		{
			if (!this.locales[index].value)
			{
				return true	
			}
		}

		return false
	}
}