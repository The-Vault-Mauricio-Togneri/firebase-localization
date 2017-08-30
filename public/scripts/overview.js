function setupApp()
{
	setupDatabase()
}

function setupDatabase()
{
	const dbRef = firebase.database().ref().child('locales')

	dbRef.on('value', snap => {
		constructLocalesTable(snap)
		displayContent()
	})
}

function constructLocalesTable(snap)
{
	const locales = snap.val()

	var oldTableBody = byId('overview-table-locales')
	var newTableBody = createTag('tbody')
	newTableBody.id = 'overview-table-locales'
	
	for (var locale in locales)
	{
		newTableBody.appendChild(createLocaleRow(locale, locales[locale]))
	}

	oldTableBody.parentNode.replaceChild(newTableBody, oldTableBody)
}

function createLocaleRow(key, locale)
{
	var tr = createTag('tr')

	var tdName = createTag('td')
	tdName.scope = 'row'
	tdName.classList.add('align-middle')
	tdName.appendChild(createText(LOCALES[key] + ' (' + key + ')'))
	tr.appendChild(tdName)

	var tdTranslated = createTag('td')
	tdTranslated.appendChild(createColoredPercentage(locale.translated))
	tdTranslated.classList.add('align-middle')
	tr.appendChild(tdTranslated)

	var tdProofread = createTag('td')
	tdProofread.appendChild(createColoredPercentage(locale.proofread))
	tdProofread.classList.add('align-middle')
	tr.appendChild(tdProofread)

	var tdEdit = createTag('td')
	tdEdit.appendChild(buttonAction('fa-pencil'))
	tdEdit.onclick = function()
	{
		openEditLanguageDialog(key)
	}
	tr.appendChild(tdEdit)

	var tdDelete = createTag('td')
	tdDelete.appendChild(buttonAction('fa-times'))
	tdDelete.onclick = function()
	{
		byId('delete-language-dialog-code').value = key

		byId('delete-language-dialog-name').innerHTML = LOCALES[key]

		$('#delete-language-dialog').modal()
	}
	tr.appendChild(tdDelete)

	var tdAndroid = createTag('td')
	tdAndroid.appendChild(buttonAction('fa-arrow-down'))
	tdAndroid.onclick = function()
	{
		downloadFile('https://us-central1-app-localization-2f645.cloudfunctions.net/exportAndroid?locale=' + key)
	}
	tr.appendChild(tdAndroid)

	var tdIOS = createTag('td')
	tdIOS.appendChild(buttonAction('fa-arrow-down'))
	tdIOS.onclick = function()
	{
		downloadFile('https://us-central1-app-localization-2f645.cloudfunctions.net/exportIOS?locale=' + key)
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

function createColoredPercentage(value)
{
	var span = createTag('span')

	if (value == 100)
	{
		span.style.color = '#80B66A'	
	}
	else if (value >= 50)
	{
		span.style.color = '#F19803'
	}
	else
	{
		span.style.color = '#FF6666'
	}

	span.appendChild(createText(value + '%'))

	return span
}

function firebaseLogout()
{
	firebase.auth().signOut().then(function() {
		window.location.href='/'
	}, function(error) {
		// handle error
	})
}

function openAddLanguageDialog()
{
	$('#add-language-select').val('').trigger('change.select2');

	byId('add-language-button-ok').innerHTML = 'Add'

	enableAddLanguageButtonOk(false)

	$('#add-language-dialog').modal()
}

function openEditLanguageDialog(locale)
{
	byId('add-language-dialog-code').value = locale

	$('#add-language-select').val(locale).trigger('change.select2');

	byId('add-language-button-ok').innerHTML = 'Edit'

	enableAddLanguageButtonOk(false)

	$('#add-language-dialog').modal()
}

function addLanguage()
{
	var select = byId('add-language-select')
	var code = byId('add-language-dialog-code')

	// TODO
	if (code.value)
	{
		console.log('EDIT: ' + code.value + ' => ' + select.value)
	}
	else
	{
		console.log('ADD: ' + select.value)
	}
}

function enableAddLanguageButtonOk(enabled)
{
	byId('add-language-button-ok').disabled = !enabled
}

function deleteLanguage()
{
	var code = byId('delete-language-dialog-code')
	
	// TODO
	console.log('DELETE: ' + code.value)
}