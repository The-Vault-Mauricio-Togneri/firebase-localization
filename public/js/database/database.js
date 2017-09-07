app.service('database', function()
{
	this.databaseRef = function()
	{
		return firebase.database().ref()
	}

	this.logDatabaseResult = function(error, label)
	{
		if (error)
		{
			console.log(`${label}: FAILED: ${error}`)
		}
		else
		{
			console.log(`${label}: OK`)
		}
	}
})