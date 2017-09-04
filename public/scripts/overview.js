function onLanguageSelected()
{
	angular.element($('body')).scope().onLanguageSelected()
}

app.controller('overviewCtrl', function($scope, database)
{
	$scope.apiToken = ''

	$scope.locales = {}

	$scope.dialog = {
		locale: {
			id: '',
			originalCode: '',
			buttonDisabled: true
		},
		deleteLocale: {
			id: '',
			name: ''
		},
		profile: {
			password: '',
			passwordConfirmation: ''
		}
	}

	$scope.init = function()
	{
		database.localesRef().on('value', snapLocales =>
		{	
			$scope.locales = database.localesFromSnap(snapLocales)

			database.translationsRef().on('value', snapTranslations =>
			{
				const summary = $scope.summary($scope.locales, database.translationsFromSnap(snapTranslations))

				for (const index in summary)
				{
					const entry = summary[index]
					$scope.locales[index].translated = (entry.total > 0) ? parseInt(entry.translated * 100 / entry.total) : 0
					$scope.locales[index].validated  = (entry.total > 0) ? parseInt(entry.validated  * 100 / entry.total) : 0
				}

				$scope.$applyAsync()
				displayContent()
			})

			database.apiTokenRef().once('value', snap =>
			{
				$scope.apiToken = snap.val()
			})
		})
	}

	$scope.summary = function(locales, translations)
	{
		var summary = {}

		for (const index in locales)
		{
			summary[index] = {
				translated: 0,
				validated: 0,
				total: 0
			}
		}

		for (const translationIndex in translations)
		{
			const translation = translations[translationIndex]

			for (const localeIndex in translation.locales)
			{
				const locale = translation.locales[localeIndex]
				
				summary[localeIndex].total++

				if (locale.value)
				{
					summary[localeIndex].translated++
				}

				if (locale.validated)
				{
					summary[localeIndex].validated++
				}
			}
		}

		return summary
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
		openLanguageDialog(null, '')
	}

	$scope.openEditLanguageDialog = function(locale)
	{
		openLanguageDialog(locale.id, locale.code)
	}

	$scope.onLanguageSelected = function()
	{
		const value = byId('language-dialog-select').value
		
		$scope.dialog.locale.buttonDisabled = (value == $scope.dialog.locale.originalCode)
		$scope.$applyAsync()
	}

	function openLanguageDialog(id, select)
	{
		$scope.dialog.locale.id = id
		$scope.dialog.locale.originalCode = select
		$scope.dialog.locale.buttonDisabled = true

		$('#language-dialog-select').val(select).trigger('change.select2')
		$('#language-dialog').modal()
	}

	$scope.onAddLanguage = function(form)
	{
		var value = {
			code: byId('language-dialog-select').value
		}

		database.addLocaleRef(value)
	}

	$scope.onEditLanguage = function(form)
	{
		var value = {
			code: byId('language-dialog-select').value
		}

		database.updateLocaleRef(form.id, value)
	}

	$scope.openDeleteLanguageDialog = function(locale)
	{
		$scope.dialog.deleteLocale.id = locale.id
		$scope.dialog.deleteLocale.name = locale.fullName

		$('#delete-language-dialog').modal()
	}

	$scope.onDeleteLanguage = function(id)
	{
		database.removeLocaleRef(id)
	}

	$scope.openProfileDialog = function()
	{
		$scope.dialog.profile.password = ''
		$scope.dialog.profile.passwordConfirmation = ''

		$('#profile-dialog').modal()
	}

	$scope.onProfileUpdated = function(password)
	{
		firebase.auth().currentUser.updatePassword(password).catch(function(error)
		{
			showError(error.message)
		})
	}

	$scope.init()
})