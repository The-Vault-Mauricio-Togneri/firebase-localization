function Backup(storage, database)
{
	this.process = function(request, response)
	{
		return database.api.token(token =>
		{
			if (token === request.query.token)
			{
				return database.ref('/').once('value', snap =>
				{
					storage.store(`/backup/${new Date().toISOString()}.ddbb`, JSON.stringify(snap.val()))

					response.status(200).send()
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