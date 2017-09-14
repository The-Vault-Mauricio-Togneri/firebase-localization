app.service('databaseSegment', function(database)
{
	this.ref = function(id)
	{
		if (id)
		{
			return database.ref(`segments/${id}`)
		}
		else
		{
			return database.ref('segments')
		}
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

	function segmentPath(segmentId)
	{
		return `segments/${segmentId}`
	}
})