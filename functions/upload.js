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
				//const body = JSON.parse(request.body)
				//const tree = importer.fromFile(body.content)

				response.status(200).send(request.body)
			}
			else
			{
				response.status(400).send()
			}
		})
	}
}

module.exports = Upload