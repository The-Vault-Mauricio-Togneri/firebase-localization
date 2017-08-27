function setupApp()
{
	setupDialogs()
	setupDatabase()
}

function setupDatabase()
{
	const dbRef = firebase.database().ref().child('locales');

	dbRef.on('value', snap => {
		constructLocalesTable(snap);
	});
}

function constructLocalesTable(snap)
{
	const list = snap.val()

	var oldTableBody = document.getElementById('overview-table-locales')
	var newTableBody = document.createElement('tbody')
	newTableBody.id = 'overview-table-locales'
	
	for (var i = 0; i < list.length; i++)
	{
		newTableBody.appendChild(createLocaleRow(list[i]))
	}

	oldTableBody.parentNode.replaceChild(newTableBody, oldTableBody)
}

function createLocaleRow(locale)
{
	var tr = document.createElement('tr')

	var tdName = document.createElement('td')
	tdName.scope = 'row'
	tdName.innerText = LOCALES[locale.code]
	tr.appendChild(tdName)

	var tdTranslated = document.createElement('td')
	tdTranslated.appendChild(createColoredPercentage(locale.translated))
	tr.appendChild(tdTranslated)

	var tdProofread = document.createElement('td')
	tdProofread.appendChild(createColoredPercentage(locale.proofread))
	tr.appendChild(tdProofread)

	var tdEdit = document.createElement('td')
	tdEdit.appendChild(createLocaleButton('edit'))
	tr.appendChild(tdEdit)

	var tdDelete = document.createElement('td')
	tdDelete.appendChild(createLocaleButton('close'))
	tr.appendChild(tdDelete)

	var tdAndroid = document.createElement('td')
	tdAndroid.appendChild(createLocaleButton('get_app'))
	tr.appendChild(tdAndroid)

	var tdIOS = document.createElement('td')
	tdIOS.appendChild(createLocaleButton('get_app'))
	tr.appendChild(tdIOS)

	return tr;
}

function createColoredPercentage(value)
{
	var span = document.createElement('span')

	if (value == 100)
	{
		span.style.color = 'green'	
	}
	else if (value >= 50)
	{
		span.style.color = 'orange'
	}
	else
	{
		span.style.color = 'red'
	}

	span.appendChild(document.createTextNode(value + '%'))

	return span;
}

function createLocaleButton(type)
{
	var button = document.createElement('button')
	button.classList.add('mdc-button') 
	button.classList.add('action-button') 

	var icon = document.createElement('i')
	icon.classList.add('material-icons') 
	icon.classList.add('custom-icon') 
	icon.appendChild(document.createTextNode(type))
	button.appendChild(icon)

	return button;
}

function firebaseLogout()
{
	firebase.auth().signOut().then(function() {
		window.location.href='/';
	}, function(error) {
		// handle error
	});
}

var logoutDialog;

function setupDialogs()
{
	logoutDialog = new mdc.dialog.MDCDialog(document.querySelector('#logut-dialog'));
	
	logoutDialog.listen('MDCDialog:accept', function() {
		firebaseLogout()
	})

	logoutDialog.listen('MDCDialog:cancel', function() {
		// nothing
	})
}