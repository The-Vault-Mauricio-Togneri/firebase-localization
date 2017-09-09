function Database(adminConfig)
{
	const admin = adminConfig

	this.ref = function(path)
	{
		return admin.database().ref(path)
	}

	this.languagesRef = function()
	{
		return admin.database().ref('languages')
	}

	this.segmentsRef = function()
	{
		return admin.database().ref('segments')
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