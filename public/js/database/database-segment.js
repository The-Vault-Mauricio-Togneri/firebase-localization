app.service('databaseSegment', function(database)
{
	this.ref = function()
	{
		return database.databaseRef().child('segments')
	}

	this.entryRef = function(id)
	{
		return database.databaseRef().child(`/segments/${id}`)
	}

	this.fromSnap = function(snap)
	{
		const segments = []

		snap.forEach(function(entry)
		{
			segments.push(new Segment(entry.key, entry.val()))
		})

		return segments
	}

	this.addSegment = function(value)
	{
		return this.ref().push(value, function(error)
		{
			database.logDatabaseResult(error, `Add segment => ${JSON.stringify(value)}`)
		})
	}

	this.updateSegment = function(id, value)
	{
		this.entryRef(id).set(value, function(error)
		{
			database.logDatabaseResult(error, `Update segment (${id}) => ${JSON.stringify(value)}`)
		})
	}

	this.updateSegmentKey = function(id, value)
	{
		this.entryRef(`${id}/key`).set(value, function(error)
		{
			database.logDatabaseResult(error, `Update segment (${id}).key => ${JSON.stringify(value)}`)
		})
	}

	this.removeSegment = function(id)
	{
		this.entryRef(id).remove(function(error)
		{
			database.logDatabaseResult(error, `Remove segment (${id})`)
		})
	}
})