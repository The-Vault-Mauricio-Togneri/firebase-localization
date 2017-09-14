function Upload(databaseConfig)
{
	const database = databaseConfig

	this.process = function(request, response, importer)
	{
		const languageCode = request.param('language')
		const token = request.query.token
		
		return database.apiToken().once('value', tokenSnap =>
		{
			if (tokenSnap.val() == token)
			{
				// TODO
			}
			else
			{
				response.status(400).send()
			}
		})
	}

	this.android = function(language, fileContent)
	{
		return null
	}
}

module.exports = Upload