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

	var oldTableBody = document.getElementById('overview-table-locales')
	var newTableBody = document.createElement('tbody')
	newTableBody.id = 'overview-table-locales'
	
	for (var locale in locales)
	{
		newTableBody.appendChild(createLocaleRow(locale, locales[locale]))
	}

	oldTableBody.parentNode.replaceChild(newTableBody, oldTableBody)
}

function createLocaleRow(key, locale)
{
	var tr = document.createElement('tr')

	var tdName = document.createElement('td')
	tdName.scope = 'row'
	tdName.classList.add('align-middle')
	tdName.appendChild(document.createTextNode(LOCALES[key] + ' (' + key + ')'))
	tr.appendChild(tdName)

	var tdTranslated = document.createElement('td')
	tdTranslated.appendChild(createColoredPercentage(locale.translated))
	tdTranslated.classList.add('align-middle')
	tr.appendChild(tdTranslated)

	var tdProofread = document.createElement('td')
	tdProofread.appendChild(createColoredPercentage(locale.proofread))
	tdProofread.classList.add('align-middle')
	tr.appendChild(tdProofread)

	var tdEdit = document.createElement('td')
	tdEdit.appendChild(buttonAction('fa-pencil'))
	tr.appendChild(tdEdit)

	var tdDelete = document.createElement('td')
	tdDelete.appendChild(buttonAction('fa-times'))
	tdDelete.onclick = function()
	{
		var code = document.getElementById('delete-language-dialog-code')
		code.value = key

		var name = document.getElementById('delete-language-dialog-name')
		name.innerHTML = LOCALES[key]

		$('#delete-language-dialog').modal()
	}
	tr.appendChild(tdDelete)

	var tdAndroid = document.createElement('td')
	tdAndroid.appendChild(buttonAction('fa-arrow-circle-o-down'))
	tr.appendChild(tdAndroid)

	var tdIOS = document.createElement('td')
	tdIOS.appendChild(buttonAction('fa-arrow-circle-o-down'))
	tr.appendChild(tdIOS)

	return tr
}

function buttonAction(iconName)
{
	var button = document.createElement('button')
	button.type = 'button'
	button.classList.add('btn')
	button.classList.add('btn-outline-light')
	button.classList.add('button-action')

	var icon = document.createElement('i')
	icon.classList.add('fa')
	icon.classList.add('button-action-icon')
	icon.classList.add(iconName)
	button.appendChild(icon)

	return button
}

function createColoredPercentage(value)
{
	var span = document.createElement('span')

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

	span.appendChild(document.createTextNode(value + '%'))

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

function addLanguage()
{
	var select = document.getElementById('add-language-select')

	// TODO
	console.log(select.value)
}

function enableAddLanguageButtonOk(enabled)
{
	var button = document.getElementById('add-language-button-ok')
	button.disabled = !enabled
}

function deleteLanguage()
{
	var code = document.getElementById('delete-language-dialog-code')
	
	// TODO
	console.log(code.value)
}