function Trigger(adminConfig)
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
	
	this.onLanguageAdded = function(event, database, admin)
	{
		database.segmentsRef(admin).once('value', snap =>
		{
			snap.forEach(function(entry)
			{
				const value = {
					value: '',
					validated: false
				}
	
				database.ref(admin, `/segments/${entry.key}/translations/${event.data.ref.key}`).set(value)
			})
		})
	}
}

module.exports = new Trigger()