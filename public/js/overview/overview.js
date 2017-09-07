function onLanguageSelected()
{
	controller(DIALOG_LANGUAGE).onLanguageSelected()
}

app.controller(CONTROLLER_OVERVIEW, function($scope, database, databaseToken, databaseLanguage, databaseSegment, ui)
{
	$scope.apiToken = ''

	$scope.languages = {}

	$scope.loading = true

	$scope.init = function()
	{
		databaseLanguage.ref().on('value', snapLanguages =>
		{	
			$scope.languages = databaseLanguage.fromSnap(snapLanguages)

			databaseSegment.ref().on('value', snapSegments =>
			{
				const segments = databaseSegment.fromSnap(snapSegments)
				const summary = $scope.summary($scope.languages, segments)

				for (const index in summary)
				{
					$scope.languages[index].translated = summary[index].translated
					$scope.languages[index].validated  = summary[index].validated
				}

				$scope.loading = false
				$scope.$applyAsync()

				databaseToken.ref().once('value', snap =>
				{
					$scope.apiToken = snap.val()
				})
			})
		})
	}

	$scope.summary = function(languages, segments)
	{
		const summary = {}

		for (const index in languages)
		{
			summary[index] = {
				translated: 0,
				validated: 0,
				total: 0
			}
		}

		for (const segmentIndex in segments)
		{
			const segment = segments[segmentIndex]

			for (const languageIndex in segment.translations)
			{
				const language = segment.translations[languageIndex]
				
				summary[languageIndex].total++

				if (language.value)
				{
					summary[languageIndex].translated++
				}

				if (language.validated)
				{
					summary[languageIndex].validated++
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

	$scope.languageProgressValue = function(value)
	{
		return {
			width: `${value}%`
		}
	}

	$scope.languageProgressColor = function(value)
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

	$scope.exportAndroid = function(language)
	{
		downloadFile(`https://${window.location.host}/api/export/${language.code}/android?token=${$scope.apiToken}`)
	}

	$scope.exportIOS = function(language)
	{
		downloadFile(`https://${window.location.host}/api/export/${language.code}/ios?token=${$scope.apiToken}`)
	}

	function downloadFile(path)
	{
		console.log(`Download file: ${path}`)

		const a = document.createElement('A')
		a.href = path
		a.download = path.substr(path.lastIndexOf('/') + 1)
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
	}

	$scope.openProfileDialog = function()
	{
		controller(DIALOG_PROFILE).open()
	}

	$scope.updateProfile = function(password)
	{
		firebase.auth().currentUser.updatePassword(password).catch(function(error)
		{
			ui.showError(error.message)
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
			ui.showError(error.message)
		})
	}

	$scope.openAddLanguageDialog = function()
	{
		controller(DIALOG_LANGUAGE).openAdd()
	}

	$scope.addLanguage = function(value)
	{
		const entry = {
			code: value
		}

		databaseLanguage.addLanguage(entry)
	}

	$scope.openEditLanguageDialog = function(language)
	{
		controller(DIALOG_LANGUAGE).openEdit(language)
	}

	$scope.editLanguage = function(id, value)
	{
		const entry = {
			code: value
		}

		databaseLanguage.updateLanguage(id, entry)
	}

	$scope.openDeleteLanguageDialog = function(language)
	{
		controller(DIALOG_DELETE_LANGUAGE).open(language)
	}

	$scope.deleteLanguage = function(id)
	{
		databaseLanguage.removeLanguage(id)
	}

	$scope.init()
})