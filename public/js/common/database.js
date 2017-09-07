app.service('database', function()
{
	this.languagesEntryRef = function(id)
	{
		return this.databaseRef().child(`languages/${id}`)
	}

	this.languagesRef = function()
	{
		return this.databaseRef().child('languages')
	}

	this.languagesFromSnap = function(snap)
	{
		const languages = {}

		snap.forEach(function(entry)
		{
			languages[entry.key] = new Language(entry.key, entry.val())
		})

		return languages
	}

	this.addLanguageRef = function(value)
	{
		this.languagesRef().push(value, function(error)
		{
			this.logDatabaseResult(error, `Add language => ${JSON.stringify(value)}`)
		})
	}

	this.updateLanguageRef = function(id, value)
	{
		this.languagesEntryRef(id).set(value, function(error)
		{
			this.logDatabaseResult(error, `Update language (${id}) => ${JSON.stringify(value)}`)
		})
	}

	this.removeLanguageRef = function(id)
	{
		this.languagesEntryRef(id).remove(function(error)
		{
			this.logDatabaseResult(error, `Remove language (${id})`)
		})
	}

	// -------------------------------

	this.segmentsEntryRef = function(id)
	{
		return this.databaseRef().child(`/segments/${id}`)
	}

	this.segmentsRef = function()
	{
		return this.databaseRef().child('segments')
	}

	this.segmentsFromSnap = function(snap)
	{
		const segments = []

		snap.forEach(function(entry)
		{
			segments.push(new Segment(entry.key, entry.val()))
		})

		return segments
	}

	this.addSegmentRef = function(value)
	{
		return this.segmentsRef().push(value, function(error)
		{
			this.logDatabaseResult(error, `Add segment => ${JSON.stringify(value)}`)
		})
	}

	this.updateSegmentRef = function(id, value)
	{
		this.segmentsEntryRef(id).set(value, function(error)
		{
			this.logDatabaseResult(error, `Update segment (${id}) => ${JSON.stringify(value)}`)
		})
	}

	this.updateSegmentKeyRef = function(id, value)
	{
		this.segmentsEntryRef(`${id}/key`).set(value, function(error)
		{
			this.logDatabaseResult(error, `Update segment (${id}).key => ${JSON.stringify(value)}`)
		})
	}

	this.removeSegmentRef = function(id)
	{
		this.segmentsEntryRef(id).remove(function(error)
		{
			this.logDatabaseResult(error, `Remove segment (${id})`)
		})
	}

	// -------------------------------

	this.updateTranslationValueRef = function(segmentId, languageId, value)
	{
		this.segmentsEntryRef(`${segmentId}/translations/${languageId}/value`).set(value, function(error)
		{
			this.logDatabaseResult(error, `Update translation (${segmentId}.${languageId}).value => ${JSON.stringify(value)}`)
		})
	}

	this.updateTranslationValidatedRef = function(segmentId, languageId, value)
	{
		this.segmentsEntryRef(`${segmentId}/translations/${languageId}/validated`).set(value, function(error)
		{
			this.logDatabaseResult(error, `Update translation (${segmentId}.${languageId}).validated => ${JSON.stringify(value)}`)
		})
	}

	// -------------------------------

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