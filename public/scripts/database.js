function databaseRef()
{
	return firebase.database().ref()
}

function localesRef()
{
	return databaseRef().child('locales')
}

function localesEntryRef(id)
{
	return databaseRef().child('locales/' + id)
}

function translationsRef()
{
	return databaseRef().child('translations')
}

function translationsEntryRef(id)
{
	return databaseRef()('/translations/' + id)
}