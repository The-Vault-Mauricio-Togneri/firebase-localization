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
			formatted += ` (${diff} days ago)`
		}

		return formatted
	}
})

app.filter('gravatar', function()
{
	return function(input)
	{
		return `http://www.gravatar.com/avatar/${md5(input)}?s=30`
	}
})

function controller(id)
{
	return angular.element($(`[ng-controller=${id}]`)).scope()
}