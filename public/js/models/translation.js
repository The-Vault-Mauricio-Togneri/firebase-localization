function Translation(id, data)
{
	this.id = id
	this.value = data.value
	this.oldValue = data.value
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
}