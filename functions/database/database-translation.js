function DatabaseTranslation(database)
{
	this.ref = function(segmentId, translationId)
	{
		return database.ref(`segments/${segmentId}/translations/${translationId}`)
	}
}

module.exports = DatabaseTranslation