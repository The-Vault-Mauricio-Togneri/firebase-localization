var localesLoaded = []

function setupApp()
{
	setupDatabase()
}

function setupDatabase()
{
	localesRef().on('value', snap => {

		localesLoaded = []

		snap.forEach(function(entry) {
			localesLoaded.push(new Locale(parseInt(entry.key), entry.val()))
		})

		constructLocalesTable(localesLoaded)
		displayContent()
	})
}

function constructLocalesTable(locales)
{
	var tableBody = byId('overview-table-locales')
	removeChildren(tableBody)
	
	for (var locale in locales)
	{
		tableBody.appendChild(createLocaleRow(locales[locale]))
	}
}

function createLocaleRow(locale)
{
	var tr = createTag('tr')

	var tdName = createTag('td')
	tdName.scope = 'row'
	tdName.classList.add('align-middle')
	tdName.appendChild(createText(locale.fullName))
	tr.appendChild(tdName)

	var tdTranslated = createTag('td')
	tdTranslated.classList.add('align-middle')
	tdTranslated.appendChild(progressBarByPercentage(locale.translated))
	tr.appendChild(tdTranslated)

	var tdValidated = createTag('td')
	tdValidated.classList.add('align-middle')
	tdValidated.appendChild(progressBarByPercentage(locale.validated))
	tr.appendChild(tdValidated)

	var tdEdit = createTag('td')
	tdEdit.appendChild(buttonAction('fa-pencil'))
	tdEdit.onclick = function()
	{
		openEditLanguageDialog(locale.code)
	}
	tr.appendChild(tdEdit)

	var tdDelete = createTag('td')
	tdDelete.appendChild(buttonAction('fa-times'))
	tdDelete.onclick = function()
	{
		byId('delete-language-dialog-code').value = locale.code

		byId('delete-language-dialog-name').innerHTML = locale.name

		$('#delete-language-dialog').modal()
	}
	tr.appendChild(tdDelete)

	var tdAndroid = createTag('td')
	tdAndroid.appendChild(buttonAction('fa-arrow-down'))
	tdAndroid.onclick = function()
	{
		downloadFile('api/export/' + locale.code + '/android')
	}
	tr.appendChild(tdAndroid)

	var tdIOS = createTag('td')
	tdIOS.appendChild(buttonAction('fa-arrow-down'))
	tdIOS.onclick = function()
	{
		downloadFile('api/export/' + locale.code + '/ios')
	}
	tr.appendChild(tdIOS)

	return tr
}

function buttonAction(iconName)
{
	var button = createTag('button')
	button.type = 'button'
	button.classList.add('btn')
	button.classList.add('btn-outline-light')
	button.classList.add('button-action')

	var icon = createTag('i')
	icon.classList.add('fa')
	icon.classList.add('button-action-icon')
	icon.classList.add(iconName)
	button.appendChild(icon)

	return button
}

function progressBarByPercentage(value)
{
	var divTranslatedProgress = createTag('div')
	divTranslatedProgress.classList.add('progress')
	divTranslatedProgress.classList.add('progress-bar-indicator')

	var divTranslatedProgressBar = createTag('div')
	divTranslatedProgressBar.classList.add('progress-bar')
	divTranslatedProgressBar.style.backgroundColor = colorByPercentage(value)
	divTranslatedProgressBar.style.width = value + '%'
	divTranslatedProgressBar.appendChild(createText(value + '%'))
	divTranslatedProgress.appendChild(divTranslatedProgressBar)

	return divTranslatedProgress
}

function colorByPercentage(value)
{
	if (value == 100)
	{
		return '#80B66A'	
	}
	else if (value >= 50)
	{
		return '#F0AD4E'
	}
	else
	{
		return '#EA5854'
	}
}

function openAddLanguageDialog()
{
	$('#add-language-select').val('').trigger('change.select2')

	byId('add-language-button-ok').innerHTML = 'Add'

	enableAddLanguageButtonOk(false)

	$('#add-language-dialog').modal()
}

function openEditLanguageDialog(locale)
{
	byId('add-language-dialog-code').value = locale

	$('#add-language-select').val(locale).trigger('change.select2')

	byId('add-language-button-ok').innerHTML = 'Edit'

	enableAddLanguageButtonOk(false)

	$('#add-language-dialog').modal()
}

function onAddLanguage()
{
	var selected = byId('add-language-select').value
	var code = byId('add-language-dialog-code').value

	if (code)
	{
		console.log('EDIT: ' + code + ' => ' + selected)

		var entry = {
			translated: 0,
			validated: 0
		}

		// TODO: how to update the translations to the new locale?
		localesEntryRef(selected).set(entry)
		localesEntryRef(code).remove()
	}
	else
	{
		var entry = {
			code: selected,
			translated: 0,
			validated: 0
		}

		localesEntryRef(nextLocaleId()).set(entry)
	}
}

function nextLocaleId()
{
	if (localesLoaded.length > 0)
	{
		return localesLoaded[localesLoaded.length - 1].index + 1
	}
	else
	{
		return 0
	}
}

function enableAddLanguageButtonOk(enabled)
{
	byId('add-language-button-ok').disabled = !enabled
}

function onDeleteLanguage()
{
	var locale = byId('delete-language-dialog-code').value

	localesEntryRef(locale).remove()
}

function firebaseLogout()
{
	firebase.auth().signOut().then(function() {
		window.location.href='/'
	}, function(error) {
		// handle error
	})
}