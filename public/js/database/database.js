app.service('database', function()
{
	this.databaseRef = function()
	{
		return firebase.database().ref()
	}

	this.child = function(path)
	{
		return firebase.database().ref().child(path)
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

	this.set = function(path, value)
	{
		this.child(path).set(value, function(error)
		{
			logResult(path, value, error)
		})
	}

	function logResult(path, value, error)
	{
		if (error)
		{
			console.log(`[${path}] => ${JSON.stringify(value)}: FAILED: ${error}`)
		}
		else
		{
			console.log(`[${path}] => ${JSON.stringify(value)}: OK`)
		}
	}
})