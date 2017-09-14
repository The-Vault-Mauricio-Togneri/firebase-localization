function Backup(storage, database)
{
	this.process = function(request, response)
	{
		const token = request.query.token
		
		return database.apiToken().once('value', tokenSnap =>
		{
			if (tokenSnap.val() == token)
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