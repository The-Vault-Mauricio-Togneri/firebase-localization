function Backup(storage, database)
{
	this.process = function(request, response)
	{
		return database.api.token(token =>
		{
			if (token === request.query.token)
			{
				return database.root(ddbb =>
				{
					const path = `/backup/${new Date().toISOString()}.ddbb`
					const content = JSON.stringify(ddbb)

					return storage.store(path, content, () =>
					{
						response.status(200).send()	
					})
				})
			}
			else
			{
				response.status(400).send()
			}
		})
	}
}

module.exports = Backup