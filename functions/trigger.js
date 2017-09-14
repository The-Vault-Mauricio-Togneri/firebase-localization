function Trigger(database)
{
    this.onTranslationUpdated = function(event)
	{
		const entry = {
			value: event.data.previous.val(),
			author: event.auth.variable.email,
			date: Date.now()
		}
		
		return event.data.ref.parent.child('history').push(entry)
	}

	this.onSegmentCreated = function(event)
	{
		const entry = {
			created: Date.now()
		}
		
		return event.data.ref.update(entry)
	}

	this.onLanguageAdded = function(event)
	{
		return database.segments().once('value', snap =>
		{
			snap.forEach(function(entry)
			{
				const value = {
					value: '',
					validated: false
				}
	
				database.translation(entry.key, event.data.ref.key).set(value)
			})
		})
	}

	this.onLanguageRemoved = function(event)
	{
		return database.segments().once('value', snap =>
		{
			snap.forEach(function(entry)
			{
				database.translation(entry.key, event.data.ref.key).remove()
			})
		})
	}
}

module.exports = Trigger