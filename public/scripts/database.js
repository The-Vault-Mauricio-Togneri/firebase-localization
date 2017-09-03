function databaseRef()
{
	return firebase.database().ref()
}

function localesFromSnap(snap)
{
	var locales = {}
	
	snap.forEach(function(entry)
	{
		locales[entry.key] = new Locale(entry.key, entry.val())
	})

	return locales
}

function localesRef()
{
	return databaseRef().child('locales')
}

function localesEntryRef(id)
{
	return databaseRef().child('locales/' + id)
}

function addLocaleRef(value)
{
	localesRef().push(value, function(error)
	{
		logDatabaseResult(error, 'Add locale => ' + JSON.stringify(value))
	})
}

function updateLocaleRef(id, value)
{
	localesEntryRef(id).set(value, function(error)
	{
		logDatabaseResult(error, 'Update locale (' + id + ') => ' + JSON.stringify(value))
	})
}

function removeLocaleRef(id)
{
	localesEntryRef(id).remove(function(error)
	{
		logDatabaseResult(error, 'Remove locale (' + id + ')')
	})
}

function translationsFromSnap(snap)
{
	var translations = {}
	
	snap.forEach(function(entry)
	{
		translations[entry.key] = new Translation(entry.key, entry.val())
	})

	return translations
}

function translationsRef()
{
	return databaseRef().child('translations')
}

function translationsEntryRef(id)
{
	return databaseRef().child('/translations/' + id)
}

function logDatabaseResult(error, label)
{
	if (error)
	{
		console.log(label + ': FAILED: ' + error)
	}
	else
	{
		console.log(label + ': OK')
	}
}