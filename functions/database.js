module.exports = {
	
	localesRef: function(admin)
	{
		return admin.database().ref('locales')
	},

	translationsRef: function(admin)
	{
		return admin.database().ref('translations')
	},

	localeByCode: function(code, snapshot)
	{
		var result = null

		snapshot.forEach(function(locale)
		{
			if (locale.val().code === code)
			{
				result = locale
			}
		})

		return result
	}
}