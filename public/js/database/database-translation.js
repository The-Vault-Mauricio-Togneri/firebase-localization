app.service('databaseTranslation', function(database)
{
	this.entryRef = function(path)
	{
		return database.databaseRef().child(path)
	}

	this.updateTranslationValue = function(segmentId, translationId, value)
	{
		const path = this.translationPath(segmentId, translationId)

		this.entryRef(`${path}/value`).set(value, function(error)
		{
			database.logDatabaseResult(error, `Update translation (${segmentId}.${translationId}).value => ${JSON.stringify(value)}`)
		})
	}

	this.updateTranslationValidated = function(segmentId, translationId, value)
	{
		const path = this.translationPath(segmentId, translationId)

		this.entryRef(`${path}/validated`).set(value, function(error)
		{
			database.logDatabaseResult(error, `Update translation (${segmentId}.${translationId}).validated => ${JSON.stringify(value)}`)
		})
	}

	this.translationPath = function(segmentId, translationId)
	{
		return `segments/${segmentId}/translations/${translationId}`
	}
})