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

	function translationPath(segmentId, translationId)
	{
		return `segments/${segmentId}/translations/${translationId}`
	}
})