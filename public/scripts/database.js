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