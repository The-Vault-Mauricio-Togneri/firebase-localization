"use strict"

const app = angular.module('segmentsApp', [])

app.filter('formatDate', function()
{
	return function(input)
	{
		const date = moment(input)
		var formatted = date.format('dddd DD MMMM YYYY HH:mm:ss')
		const diff = moment().startOf('day').diff(date.startOf('day'), 'days')

		if (diff == 1)
		{
			formatted += ' (1 day ago)'
		}
		else if (diff > 0)
		{
			formatted += ' (' + diff + ' days ago)'
		}

		return formatted
	}
})

app.filter('gravatar', function()
{
	return function(input)
	{
		return "http://www.gravatar.com/avatar/" + md5(input) + "?s=30"
	}
})

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
	//const element = document.querySelector('[ng-controller=' + id + ']');
	//return angular.element(element).scope()

	return angular.element($('[ng-controller=' + id + ']')).scope()
}

function dialog(id)
{
	return $('[ng-controller=' + id + ']')
}

function openDialog(id)
{
	$('[ng-controller=' + id + ']').modal()
}

function closeDialog(id)
{
	$('[ng-controller=' + id + ']').modal('hide')
}

function focus(id)
{
	$('#' + id).focus()
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