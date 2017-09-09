function Database()
{
	this.languagesRef = function(admin)
	{
		return admin.database().ref('languages')
	}

	this.segmentsRef = function(admin)
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

module.exports = new Database()