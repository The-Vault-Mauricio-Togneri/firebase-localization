function onLanguageSelected()
{
	controllerById('dialog-language').onLanguageSelected()
}

app.controller('overviewCtrl', function($scope, database)
{
	$scope.apiToken = ''

	$scope.locales = {}

	$scope.init = function()
	{
		database.localesRef().on('value', snapLocales =>
		{	
			$scope.locales = database.localesFromSnap(snapLocales)

			database.translationsRef().on('value', snapTranslations =>
			{
				const translations = database.translationsFromSnap(snapTranslations)
				const summary = $scope.summary($scope.locales, translations)

				for (const index in summary)
				{
					$scope.locales[index].translated = summary[index].translated
					$scope.locales[index].validated  = summary[index].validated
				}

				$scope.$applyAsync()
				displayContent()

				database.apiTokenRef().once('value', snap =>
				{
					$scope.apiToken = snap.val()
				})
			})
		})
	}

	$scope.summary = function(locales, translations)
	{
		const summary = {}

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

		for (const index in summary)
		{
			summary[index].translated = (summary[index].total > 0) ? parseInt(summary[index].translated * 100 / summary[index].total) : 0
			summary[index].validated  = (summary[index].total > 0) ? parseInt(summary[index].validated  * 100 / summary[index].total) : 0
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

	$scope.openProfileDialog = function()
	{
		controllerById('profile-dialog').open()
	}

	$scope.updateProfile = function(password)
	{
		firebase.auth().currentUser.updatePassword(password).catch(function(error)
		{
			showError(error.message)
		})
	}

	$scope.logout = function()
	{
		firebase.auth().signOut().then(function()
		{
			window.location.href = '/'
		},
		function(error)
		{
			showError(error.message)
		})
	}

	$scope.openAddLanguageDialog = function()
	{
		controllerById('dialog-language').openAdd()
	}

	$scope.addLanguage = function(value)
	{
		const entry = {
			code: value
		}

		database.addLocaleRef(entry)
	}

	$scope.openEditLanguageDialog = function(locale)
	{
		controllerById('dialog-language').openEdit(locale)
	}

	$scope.editLanguage = function(id, value)
	{
		const entry = {
			code: value
		}

		database.updateLocaleRef(id, entry)
	}

	$scope.openDeleteLanguageDialog = function(locale)
	{
		controllerById('dialog-delete-language').open(locale)
	}

	$scope.deleteLanguage = function(id)
	{
		database.removeLocaleRef(id)
	}

	$scope.init()
})