app.service('databaseSegment', function(database)
{
	this.ref = function()
	{
		return database.databaseRef().child('segments')
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
		return database.push('segments', value)
	}

	this.updateSegment = function(id, value)
	{
		database.set(segmentPath(id), value)
	}

	this.updateSegmentKey = function(id, value)
	{
		const basePath = segmentPath(id)
		
		database.set(`${basePath}/key`, value)
	}

	this.removeSegment = function(id)
	{
		database.remove(segmentPath(id))
	}

	function segmentPath(segmentId)
	{
		return `segments/${segmentId}`
	}
})