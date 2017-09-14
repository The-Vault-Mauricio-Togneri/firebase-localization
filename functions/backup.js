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
					const ddbb = snap.val()
					
					storage.store(`/backup/${new Date().toISOString()}.ddbb`, 'AKANT!')

					response.status(200).send(ddbb)
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