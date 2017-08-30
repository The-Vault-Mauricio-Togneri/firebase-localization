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
			displayContent()
		})
	})
}

function constructTranslationsTableHeader(snap)
{
	const locales = snap.val()
	
	var oldTableHead = byId('translations-table-header')
	var newTableHead = createTag('thead')
	newTableHead.id = 'translations-table-header'
	newTableHead.classList.add('thead-default')

	newTableHead.appendChild(createEntryHeader(locales))

	oldTableHead.parentNode.replaceChild(newTableHead, oldTableHead)
}

function createEntryHeader(locales)
{
	var tr = createTag('tr')

	var thKey = createTag('th')
	thKey.appendChild(createText('Key'))
	tr.appendChild(thKey)

	for (var locale in locales)
	{
		var thLocaleName = createTag('th')
		thLocaleName.appendChild(createText(LOCALES[locale] + ' (' + locale + ')'))
		tr.appendChild(thLocaleName)

		var thLocaleProffIcon = createTag('th')
		var icon = createTag('i')
		icon.classList.add('fa')
		icon.classList.add('fa-check')
		icon.classList.add('translation-checkbox-header')
		thLocaleProffIcon.appendChild(icon)
		tr.appendChild(thLocaleProffIcon)
	}

	return tr
}

function constructTranslationsTableEntries(snap)
{
	const entries = snap.val()

	var oldTableBody = byId('translations-table-entries')
	var newTableBody = createTag('tbody')
	newTableBody.id = 'translations-table-entries'

	for (var entry in entries)
	{
		newTableBody.appendChild(createEntryRow(entry, entries[entry]))
	}

	oldTableBody.parentNode.replaceChild(newTableBody, oldTableBody)
}

function createEntryRow(key, entry)
{
	var tr = createTag('tr')

	var tdKey = createTag('td')
	tdKey.scope = 'row'
	var keyInput = createTag('input')
	keyInput.type = 'text'
	keyInput.classList.add('form-control')
	keyInput.value = key
	tdKey.appendChild(keyInput)
	tr.appendChild(tdKey)

	for (var locale in entry.locales)
	{
		createEntryInputs(key, locale, entry.locales[locale], tr)
	}

	return tr
}

function createEntryInputs(key, locale, entry, tr)
{
	var tdValue = createTag('td')
	var input = createTag('input')
	input.id = key + '/locales/' + locale + '/value'
	input.type = 'text'
	input.classList.add('form-control')
	input.value = entry.value
	input.onblur = function()
	{
		onInputUpdated(input.id, input.value)
	}
	tdValue.appendChild(input)
	tr.appendChild(tdValue)

	var tdProofread = createTag('td')
	tdProofread.classList.add('align-middle')
	tdProofread.classList.add('translation-checkbox-container')

	var labelCheckbox = createTag('label')
	labelCheckbox.classList.add('custom-control')
	labelCheckbox.classList.add('custom-checkbox')
	labelCheckbox.classList.add('translation-checkbox')

	var inputCheckbox = createTag('input')
	inputCheckbox.id = key + '/locales/' + locale + '/proofread'
	inputCheckbox.type = 'checkbox'
	inputCheckbox.checked = entry.proofread
	inputCheckbox.classList.add('custom-control-input')
	inputCheckbox.onchange = function()
	{
		onInputUpdated(inputCheckbox.id, inputCheckbox.checked)
	}
	labelCheckbox.appendChild(inputCheckbox)

	var spanCheckbox = createTag('span')
	spanCheckbox.classList.add('custom-control-indicator')
	labelCheckbox.appendChild(spanCheckbox)

	tdProofread.appendChild(labelCheckbox)
	tr.appendChild(tdProofread)
}

function onInputUpdated(id, value)
{
	firebase.database().ref('/translations/' + id).set(value, function(error) {
		/*if (error) {
			console.log('Data could not be saved.' + error)
		} else {
			console.log('Data saved successfully.')
		}*/
	})
}