app.service('databaseTranslation', function(database)
{
	this.updateValue = function(segmentId, translationId, value)
	{
		const basePath = translationPath(segmentId, translationId)

		database.set(`${basePath}/value`, value)
	}

	this.updateValidated = function(segmentId, translationId, value)
	{
		const basePath = translationPath(segmentId, translationId)
		
		database.set(`${basePath}/validated`, value)
	}

	this.update = function(segmentId, translationId, value)
	{
		const path = translationPath(segmentId, translationId)
		
		database.update(path, value)
	}

	this.addComment = function(segmentId, translationId, comment)
	{
		const basePath = translationPath(segmentId, translationId)

		database.push(`${basePath}/comments`, comment)
	}

	function translationPath(segmentId, translationId)
	{
		return `segments/${segmentId}/translations/${translationId}`
	}
})