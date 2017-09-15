function Upload(database)
{
	this.process = function(request, response, importer)
	{
		const languageCode = request.param('language')
		
		return database.api.token(token =>
		{
			if (token === request.query.token)
			{
				const replace = request.query.replace === true
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