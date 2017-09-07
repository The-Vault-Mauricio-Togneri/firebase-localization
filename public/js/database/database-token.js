app.service('databaseToken', function(database)
{
	this.ref = function()
	{
		return database.child('api/token')
	}
})