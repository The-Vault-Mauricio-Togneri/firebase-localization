function Database(admin)
{
	this.ref = function(path)
	{
		return admin.database().ref(path)
	}

	this.languages = function()
	{
		return admin.database().ref('languages')
	}

	this.segments = function()
	{
		return admin.database().ref('segments')
	}

	this.translation = function(segmentId, translationId)
	{
		return admin.database().ref(`segments/${segmentId}/translations/${translationId}`)
	}

	this.apiToken = function()
	{
		return admin.database().ref('api/token')
	}

	this.languageByCode = function(code, snapshot)
	{
		var result = null

		snapshot.forEach(function(language)
		{
			if (language.val().code === code)
			{
				result = language
			}
		})

		return result
	}
}

module.exports = Database