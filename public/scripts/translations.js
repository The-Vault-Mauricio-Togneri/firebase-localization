var localesLoaded = []

function setupApp()
{
	setupDatabase()
}

function setupDatabase()
{
	localesRef().once('value', snapLocales => {
		
		localesLoaded = localesFromSnap(snapLocales)
		constructTranslationsTableHeader(localesLoaded)
		constructTranslationsFilter(localesLoaded)

		translationsRef().once('value', snapTranslations => {
			var translations = translationsFromSnap(snapTranslations)
			constructTranslationsTableEntries(translations)
			displayContent()
		})
	})
}

function constructTranslationsTableHeader(locales)
{
	var tableHead = byId('translations-table-header')
	removeChildren(tableHead)

	var tr = createTag('tr')
	
	var thKey = createTag('th')
	thKey.appendChild(createText('Key'))
	tr.appendChild(thKey)

	for (var locale in locales)
	{
		createEntryHeader(tr, locales[locale])
	}

	tableHead.appendChild(tr)
}

function createEntryHeader(tr, locale)
{
	var thLocaleName = createTag('th')
	thLocaleName.appendChild(createText(locale.fullName))
	tr.appendChild(thLocaleName)

	var thLocaleProffIcon = createTag('th')
	var icon = createTag('i')
	icon.classList.add('fa')
	icon.classList.add('fa-check')
	icon.classList.add('translation-checkbox-header')
	thLocaleProffIcon.appendChild(icon)
	tr.appendChild(thLocaleProffIcon)
}

function constructTranslationsFilter(locales)
{
	var filterLocaleContainer = byId('filter-locale-container')
	removeChildren(filterLocaleContainer)

	for (var locale in locales)
	{
		filterLocaleContainer.appendChild(createEntryFilter(locales[locale]))
	}
}

function createEntryFilter(locale)
{
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
	filterSpanText.appendChild(createText(locale.fullName))
	filterLabel.appendChild(filterSpanText)

	return filterLabel	
}

function constructTranslationsTableEntries(translations)
{
	var tableBody = byId('translations-table-entries')
	removeChildren(tableBody)

	for (var translation in translations)
	{
		tableBody.appendChild(createEntryRow(translations[translation]))
	}
}

function createEntryRow(translation)
{
	var tr = createTag('tr')

	var tdKey = createTag('td')
	tdKey.scope = 'row'
	var keyInput = createTag('input')
	keyInput.id = translation.key + '/code'
	keyInput.type = 'text'
	keyInput.classList.add('form-control')
	keyInput.value = translation.code
	keyInput.onblur = function()
	{
		onInputUpdated(keyInput.id, keyInput.value)
	}
	tdKey.appendChild(keyInput)
	tr.appendChild(tdKey)

	for (var locale in translation.locales)
	{
		createEntryInputs(tr, translation, locale, translation.locales[locale])
	}

	return tr
}

function createEntryInputs(tr, translation, localeKey, locale)
{
	var tdValue = createTag('td')
	var input = createTag('input')
	input.id = translation.key + '/locales/' + localeKey + '/value'
	input.type = 'text'
	input.classList.add('form-control')
	input.value = locale.value
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
	inputCheckbox.id = translation.key + '/locales/' + localeKey + '/validated'
	inputCheckbox.type = 'checkbox'
	inputCheckbox.checked = locale.validated
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
	console.log('Update: ' + id + ' => ' + value)

	translationsEntryRef(id).set(value, function(error) {
		if (error)
		{
			console.log('Data could not be saved: ' + error)
		}
		else
		{
			console.log('Data saved successfully')
		}
	})
}

function openAddTranslationDialog()
{
	byId('add-translation-dialog-key').value = ''
	byId('add-translation-dialog-description').value = ''

	$('#add-translation-dialog').modal()
}

function onAddTranslation()
{
	var key = byId('add-translation-dialog-key').value
	var description = byId('add-translation-dialog-description').value

	var value = {
		code: key,
		description: description,
		locales: []
	}

	for (var locale in localesLoaded)
	{
		var entry = localesLoaded[locale]

		value.locales[entry.key] = {
			value: '',
			validated: false
		}
	}

	translationsRef().push(value)
}