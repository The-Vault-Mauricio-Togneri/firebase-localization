app.service('databaseToken', function(database)
{
	this.ref = function()
	{
		return database.ref('api/token')
	}
})