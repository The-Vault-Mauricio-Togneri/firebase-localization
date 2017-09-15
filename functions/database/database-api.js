function DatabaseApi(database)
{
	this.token = function(callback)
	{
		return database.ref('api/token').once('value', snap =>
		{
			callback(snap.val())
		})
	}
}

module.exports = DatabaseApi