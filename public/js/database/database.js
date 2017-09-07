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

	this.push = function(path, value)
	{
		return this.child(path).push(value, function(error)
		{
			logResultPush(path, value, error)
		})
	}

	this.set = function(path, value)
	{
		return this.child(path).set(value, function(error)
		{
			logResultSet(path, value, error)
		})
	}

	this.remove = function(path)
	{
		return this.child(path).remove(function(error)
		{
			logResultRemove(path, error)
		})
	}

	function logResultPush(path, value, error)
	{
		if (error)
		{
			console.log(`CREATED [${path}] => ${JSON.stringify(value)}: FAILED: ${error}`)
		}
		else
		{
			console.log(`CREATED [${path}] => ${JSON.stringify(value)}: OK`)
		}
	}

	function logResultSet(path, value, error)
	{
		if (error)
		{
			console.log(`UPDATED [${path}] => ${JSON.stringify(value)}: FAILED: ${error}`)
		}
		else
		{
			console.log(`UPDATED [${path}] => ${JSON.stringify(value)}: OK`)
		}
	}

	function logResultRemove(path, error)
	{
		if (error)
		{
			console.log(`REMOVED [${path}]: FAILED: ${error}`)
		}
		else
		{
			console.log(`REMOVED [${path}]: OK`)
		}
	}
})