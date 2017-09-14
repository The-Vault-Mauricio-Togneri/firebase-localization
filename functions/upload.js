function Upload(database)
{
	this.process = function(request, response, importer)
	{
		const languageCode = request.param('language')
		const token = request.query.token
		
		return database.apiToken().once('value', tokenSnap =>
		{
			if (tokenSnap.val() == token)
			{
				const body = JSON.parse(request.body)
				const tree = importer(body.content)

				response.status(200).send(tree)
			}
			else
			{
				response.status(400).send()
			}
		})
	}

	this.android = function(fileContent)
	{
		var result = []
		result['foo'] = 'bar'
		result['abc'] = '123'

		return result
	}
}

module.exports = Upload