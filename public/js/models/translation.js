function Translation(id, data)
{
	this.id = id
	this.value = data.value
	this.validated = data.validated
	this.history = {}
	this.comments = {}

	for (const index in data.history)
	{
		this.history[index] = new History(index, data.history[index])
	}

	for (const index in data.comments)
	{
		this.comments[index] = new Comment(index, data.comments[index])
	}

	this.update = function(translation)
	{
		this.id = translation.id
		this.validated = translation.validated
		this.history = {}
		this.comments = {}
	
		for (const index in translation.history)
		{
			this.history[index] = new History(index, translation.history[index])
		}
	
		for (const index in translation.comments)
		{
			this.comments[index] = new Comment(index, translation.comments[index])
		}
	}
}