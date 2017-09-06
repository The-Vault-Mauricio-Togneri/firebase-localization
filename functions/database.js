module.exports = {
	
	languagesRef: function(admin)
	{
		return admin.database().ref('languages')
	},

	translationsRef: function(admin)
	{
		return admin.database().ref('translations')
	},

	languageByCode: function(code, snapshot)
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