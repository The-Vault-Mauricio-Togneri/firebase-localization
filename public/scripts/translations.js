function setupApp()
{
	setupDatabase()
}

function setupDatabase()
{
	localesRef().on('value', snapLocales => {
		constructTranslationsTableHeader(snapLocales)

		translationsRef().on('value', snapTranslations => {
			constructTranslationsTableEntries(snapTranslations)
			displayContent()
		})
	})
}

function constructTranslationsTableHeader(snap)
{
	const locales = snap.val()
	
	var tableHead = byId('translations-table-header')
	removeChildren(tableHead)
	tableHead.appendChild(createEntryHeader(locales))
}

function createEntryHeader(locales)
{
	var tr = createTag('tr')

	var thKey = createTag('th')
	thKey.appendChild(createText('Key'))
	tr.appendChild(thKey)

	var filterLocaleContainer = byId('filter-locale-container')
	removeChildren(filterLocaleContainer)

	for (var locale in locales)
	{
		var localeName = LOCALES[locale] + ' (' + locale + ')'

		var thLocaleName = createTag('th')
		thLocaleName.appendChild(createText(localeName))
		tr.appendChild(thLocaleName)

		var thLocaleProffIcon = createTag('th')
		var icon = createTag('i')
		icon.classList.add('fa')
		icon.classList.add('fa-check')
		icon.classList.add('translation-checkbox-header')
		thLocaleProffIcon.appendChild(icon)
		tr.appendChild(thLocaleProffIcon)

		//-------------

		var filterLabel = createTag('label')
		filterLabel.classList.add('custom-control')
		filterLabel.classList.add('custom-checkbox')
		filterLabel.classList.add('filter-checkbox')

		var filterInput = createTag('input')
		filterInput.classList.add('custom-control-input')
		filterInput.type = 'checkbox'
		filterInput.checked = true
		filterLabel.appendChild(filterInput)

		var filterSparIndicator = createTag('span')
		filterSparIndicator.classList.add('custom-control-indicator')
		filterLabel.appendChild(filterSparIndicator)

		var filterSpanText = createTag('span')
		filterSpanText.classList.add('custom-control-description')
		filterSpanText.classList.add('noselect')
		filterSpanText.appendChild(createText(localeName))
		filterLabel.appendChild(filterSpanText)

		filterLocaleContainer.appendChild(filterLabel)
	}

	return tr
}

function constructTranslationsTableEntries(snap)
{
	const entries = snap.val()

	var tableBody = byId('translations-table-entries')
	removeChildren(tableBody)

	for (var entry in entries)
	{
		tableBody.appendChild(createEntryRow(entry, entries[entry]))
	}
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

	var tdValidated = createTag('td')
	tdValidated.classList.add('align-middle')
	tdValidated.classList.add('translation-checkbox-container')

	var labelCheckbox = createTag('label')
	labelCheckbox.classList.add('custom-control')
	labelCheckbox.classList.add('custom-checkbox')
	labelCheckbox.classList.add('translation-checkbox')

	var inputCheckbox = createTag('input')
	inputCheckbox.id = key + '/locales/' + locale + '/validated'
	inputCheckbox.type = 'checkbox'
	inputCheckbox.checked = entry.validated
	inputCheckbox.classList.add('custom-control-input')
	inputCheckbox.onchange = function()
	{
		onInputUpdated(inputCheckbox.id, inputCheckbox.checked)
	}
	labelCheckbox.appendChild(inputCheckbox)

	var spanCheckbox = createTag('span')
	spanCheckbox.classList.add('custom-control-indicator')
	labelCheckbox.appendChild(spanCheckbox)

	tdValidated.appendChild(labelCheckbox)
	tr.appendChild(tdValidated)
}

function onInputUpdated(id, value)
{
	translationsEntryRef(id).set(value, function(error) {
		/*if (error) {
			console.log('Data could not be saved.' + error)
		} else {
			console.log('Data saved successfully.')
		}*/
	})
}