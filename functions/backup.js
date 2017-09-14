function Backup(databaseConfig)
{
	const database = databaseConfig

	this.process = function(request, response)
	{
		const token = request.query.token
		
		return database.apiToken().once('value', tokenSnap =>
		{
			if (tokenSnap.val() == token)
			{
				// TODO
			}
			else
			{
				response.status(400).send();
			}
		})
	}
}

module.exports = Backup