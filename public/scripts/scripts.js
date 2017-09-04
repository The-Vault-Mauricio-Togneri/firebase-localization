"use strict"

const app = angular.module('translationsApp', [])

function byId(id)
{
	return document.getElementById(id)
}

function displayContent()
{
	byId('loading-progress').style.display = 'none'
	byId('overview-content').style.display = 'block'
}

function showError(message)
{
	const alert = byId('error-message')
	alert.style.visibility = 'visible'
	alert.children[0].innerHTML = message

	setTimeout(function()
	{
		alert.style.visibility = 'hidden'
		alert.children[0].innerHTML = ''
	}, 3000)
}

function controllerById(id)
{
	return angular.element($('#' + id)).scope()
}

function openDialog(id)
{
	$('#' + id).modal()
}

function closeDialog(id)
{
	$('#' + id).modal('hide')
}

function downloadFile(path)
{
	const a = document.createElement('A')
	a.href = path
	a.download = path.substr(path.lastIndexOf('/') + 1)
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
}