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
		this.translations = {}

		for (const index in segment.translations)
		{
			this.translations[index] = new Translation(index, segment.translations[index])
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

	this.contains = function(text)
	{
		for (const index in this.translations)
		{
			if (this.translations[index].value.toLowerCase().includes(text))
			{
				return true	
			}
		}

		return this.key.toLowerCase().includes(text) || this.description.toLowerCase().includes(text) || (this.tags.indexOf(text) != -1)
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