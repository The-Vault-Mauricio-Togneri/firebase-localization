app.service('databaseSegment', function(database)
{
	this.refLive = function(id, callback)
	{
		database.ref(`segments/${id}`).on('value', callback)
	}

	this.rootStatic = function(callback)
	{
		database.ref('segments').once('value', snap =>
		{	
			var segments = []
			
			snap.forEach(function(entry)
			{
				segments.push(new Segment(entry.key, entry.val()))
			})
	
			callback(segments)
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

	function segmentPath(segmentId)
	{
		return `segments/${segmentId}`
	}
})