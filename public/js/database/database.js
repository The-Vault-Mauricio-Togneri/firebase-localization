app.service('database', function()
{
	this.ref = function(path)
	{
		return firebase.database().ref(path)
	}

	this.push = function(path, value)
	{
		return this.ref(path).push(value, error =>
		{
			logResultPush(path, value, error)
		})
	}

	this.set = function(path, value)
	{
		return this.ref(path).set(value, error =>
		{
			logResultSet(path, value, error)
		})
	}

	this.update = function(path, value)
	{
		return this.ref(path).update(value, error =>
		{
			logResultUpdate(path, value, error)
		})
	}

	this.remove = function(path)
	{
		return this.ref(path).remove(function(error)
		{
			logResultRemove(path, error)
		})
	}

	function logResultPush(path, value, error)
	{
		if (error)
		{
			console.log(`PUSHED [${path}] => ${JSON.stringify(value)}: FAILED: ${error}`)
		}
		else
		{
			console.log(`PUSHED [${path}] => ${JSON.stringify(value)}: OK`)
		}
	}

	function logResultSet(path, value, error)
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

	function logResultUpdate(path, value, error)
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