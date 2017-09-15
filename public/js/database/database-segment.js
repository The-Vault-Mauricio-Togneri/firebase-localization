app.service('databaseSegment', function(database)
{
	this.refLive = function(id, callback)
	{
		database.ref(`segments/${id}`).on('value', snap =>
		{	
			callback(snap)
		})
	}

	this.rootStatic = function(callback)
	{
		database.ref('segments').once('value', snap =>
		{	
			callback(fromSnap(snap))
		})
	}

	this.add = function(value)
	{
		return database.push('segments', value)
	}

	this.update = function(id, value)
	{
		return database.update(segmentPath(id), value)
	}

	this.updateKey = function(id, value)
	{
		const basePath = segmentPath(id)
		
		return database.set(`${basePath}/key`, value)
	}

	this.remove = function(id)
	{
		return database.remove(segmentPath(id))
	}

	// =========================================================================

	function fromSnap(snap)
	{
		var segments = []

		snap.forEach(function(entry)
		{
			segments.push(new Segment(entry.key, entry.val()))
		})

		return segments
	}

	function segmentPath(segmentId)
	{
		return `segments/${segmentId}`
	}
})