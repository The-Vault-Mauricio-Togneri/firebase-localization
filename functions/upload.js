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
				console.log(request.query.replace)
				const entries = importer.fromFile(request.body)
				console.log(entries)

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