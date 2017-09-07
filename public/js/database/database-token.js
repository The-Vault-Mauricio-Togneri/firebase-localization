app.service('databaseToken', function(database)
{
	this.ref = function()
	{
		return database.databaseRef().child('api/token')
	}
})