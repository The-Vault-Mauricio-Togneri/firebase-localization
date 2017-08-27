function setupApp()
{
	setupDatabase()
}

function setupDatabase()
{
	const dbRefLocales = firebase.database().ref().child('locales')
	
	dbRefLocales.on('value', snapLocales => {
		constructTranslationsTableHeader(snapLocales)

		const dbRef = firebase.database().ref().child('translations')
		
		dbRef.on('value', snapTranslations => {
			constructTranslationsTableEntries(snapTranslations)
		})
	})
}

function constructTranslationsTableHeader(snap)
{
	const locales = snap.val()
	
	var oldTableHead = document.getElementById('translations-table-header')
	var newTableHead = document.createElement('thead')
	newTableHead.id = 'translations-table-header'
	newTableHead.classList.add('thead-default')

	newTableHead.appendChild(createEntryHeader(locales))

	oldTableHead.parentNode.replaceChild(newTableHead, oldTableHead)
}

function createEntryHeader(locales)
{
	var tr = document.createElement('tr')

	var thKey = document.createElement('th')
	thKey.appendChild(document.createTextNode('Key'))
	tr.appendChild(thKey)

	for (var locale in locales)
	{
		var thLocaleName = document.createElement('th')
		thLocaleName.appendChild(document.createTextNode(LOCALES[locale] + ' (' + locale + ')'))
		tr.appendChild(thLocaleName)

		var thLocaleProffIcon = document.createElement('th')
		var icon = document.createElement('i')
		icon.classList.add('material-icons')
		icon.appendChild(document.createTextNode('done_all'))
		thLocaleProffIcon.appendChild(icon)
		tr.appendChild(thLocaleProffIcon)
	}

	return tr
}

function constructTranslationsTableEntries(snap)
{
	const entries = snap.val()

	var oldTableBody = document.getElementById('translations-table-entries')
	var newTableBody = document.createElement('tbody')
	newTableBody.id = 'translations-table-entries'

	for (var entry in entries)
	{
		newTableBody.appendChild(createEntryRow(entry, entries[entry]))
	}

	oldTableBody.parentNode.replaceChild(newTableBody, oldTableBody)
}

function createEntryRow(key, entry)
{
	var tr = document.createElement('tr')

	var tdKey = document.createElement('td')
	tdKey.scope = 'row'
	var keyInput = document.createElement('input')
	keyInput.type = 'text'
	keyInput.classList.add('mdc-textfield__input')
	keyInput.value = key
	tdKey.appendChild(keyInput)
	tr.appendChild(tdKey)

	for (var locale in entry.locales)
	{
		var localeInfo = entry.locales[locale]

		var tdValue = document.createElement('td')
		var input = document.createElement('input')
		input.type = 'text'
		input.classList.add('mdc-textfield__input')
		input.value = localeInfo.value
		tdValue.appendChild(input)
		tr.appendChild(tdValue)
	
		var tdProofread = document.createElement('td')
		var divCheckbox = document.createElement('div')
		divCheckbox.classList.add('mdc-checkbox')

		var inputCheckbox = document.createElement('input')
		inputCheckbox.type = 'checkbox'
		inputCheckbox.classList.add('mdc-checkbox__native-control')
		divCheckbox.appendChild(inputCheckbox)

		var divBackground = document.createElement('div')
		divBackground.classList.add('mdc-checkbox__background')
		divCheckbox.appendChild(divBackground)

		var svg = document.createElement('svg')
		svg.classList.add('mdc-checkbox__checkmark')
		svg.viewBox = '0 0 24 24'
		divBackground.appendChild(svg)

		var path = document.createElement('path')
		path.classList.add('mdc-checkbox__checkmark__path')
		path.fill = 'none'
		path.stroke = 'white'
		path.d = 'M1.73,12.91 8.1,19.28 22.79,4.59'
		svg.appendChild(path)

		tdProofread.appendChild(divCheckbox)
		tr.appendChild(tdProofread)
	}

	return tr
}