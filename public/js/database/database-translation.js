app.service('databaseTranslation', function(database)
{
	this.ref = function(segmentId)
	{
		return database.databaseRef().child(`${segmentId}/translations`)
	}

	this.entryRef = function(segmentId, translationId)
	{
		return database.databaseRef().child(`${segmentId}/translations/${translationId}`)
	}

	this.updateTranslationValue = function(segmentId, translationId, value)
	{
		this.entryRef(segmentId, translationId).set(value, function(error)
		{
			database.logDatabaseResult(error, `Update translation (${segmentId}.${translationId}).value => ${JSON.stringify(value)}`)
		})
	}

	this.updateTranslationValidated = function(segmentId, translationId, value)
	{
		this.entryRef(segmentId, translationId).set(value, function(error)
		{
			database.logDatabaseResult(error, `Update translation (${segmentId}.${translationId}).validated => ${JSON.stringify(value)}`)
		})
	}
})