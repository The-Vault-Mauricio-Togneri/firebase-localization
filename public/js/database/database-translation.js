app.service('databaseTranslation', function(database)
{
	this.updateTranslationValue = function(segmentId, translationId, value)
	{
		const basePath = translationPath(segmentId, translationId)

		database.set(`${basePath}/value`, value)
	}

	this.updateTranslationValidated = function(segmentId, translationId, value)
	{
		const basePath = translationPath(segmentId, translationId)
		
		database.set(`${basePath}/validated`, value)
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