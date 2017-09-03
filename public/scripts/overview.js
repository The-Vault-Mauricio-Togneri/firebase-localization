function enableAddLanguageButtonOk(enabled)
{
	byId('language-dialog-button-ok').disabled = !enabled
}

angular.module('overviewApp', []).controller('overviewCtrl', function($scope)
{
	$scope.locales = {}
	
	$scope.init = function()
	{
		localesRef().on('value', snap =>
		{
			$scope.locales = localesFromSnap(snap)
			$scope.$applyAsync()
			displayContent()
		})
	}

	$scope.localeProgressValue = function(value)
	{
		return {
			width: value + '%'
		}
	}

	$scope.localeProgressColor = function(value)
	{
		if (value == 100)
		{
			return 'progress-bar-indicator-high'
		}
		else if (value >= 50)
		{
			return 'progress-bar-indicator-medium'
		}
		else
		{
			return 'progress-bar-indicator-low'
		}
	}

	$scope.exportAndroid = function(locale)
	{
		downloadFile('https://' + window.location.host + '/api/export/' + locale.code + '/android')
	}

	$scope.exportIOS = function(locale)
	{
		downloadFile('https://' + window.location.host + '/api/export/' + locale.code + '/ios')
	}

	$scope.openAddLanguageDialog = function()
	{
		openLanguageDialog(null, 'Add', '')
	}

	$scope.openEditLanguageDialog = function(locale)
	{
		openLanguageDialog(locale, 'Edit', locale.code)
	}

	function openLanguageDialog(locale, buttonText, initialSelect)
	{
		byId('language-dialog-locale').locale = locale
		byId('language-dialog-button-ok').innerHTML = buttonText
	
		$('#language-dialog-select').val(initialSelect).trigger('change.select2')
		$('#language-dialog').modal()

		enableAddLanguageButtonOk(false)
	}

	$scope.openDeleteLanguageDialog = function(locale)
	{
		byId('delete-language-dialog-locale').locale = locale
		byId('delete-language-dialog-name').innerHTML = locale.name
		$('#delete-language-dialog').modal()
	}

	$scope.onDeleteLanguage = function()
	{
		var locale = byId('delete-language-dialog-locale').locale
	
		localesEntryRef(locale.key).remove()
	}

	$scope.onAddLanguage = function()
	{
		var selected = byId('language-dialog-select').value
		var locale = byId('language-dialog-locale').locale

		if (locale)
		{
			var value = {
				code: selected,
				translated: locale.translated,
				validated: locale.validated
			}

			localesEntryRef(locale.key).set(value)
		}
		else
		{
			var value = {
				code: selected,
				translated: 0,
				validated: 0
			}

			localesRef().push(value)
		}
	}

	$scope.init()
})