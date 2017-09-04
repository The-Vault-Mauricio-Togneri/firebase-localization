"use strict"

var app = angular.module('translationsApp', [])

function byId(id)
{
	return document.getElementById(id)
}

function createTag(type)
{
	return document.createElement(type)
}

function createText(content)
{
	return document.createTextNode(content)
}

function removeChildren(element)
{
	while (element.firstChild)
	{
		element.removeChild(element.firstChild)
	}
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

function downloadFile(path)
{
	var a = createTag('A')
	a.href = path
	a.download = path.substr(path.lastIndexOf('/') + 1)
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
}