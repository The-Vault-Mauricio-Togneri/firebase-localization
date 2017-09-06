function onLanguageSelected()
{
	controllerById('dialog-language').onLanguageSelected()
}

app.controller('overviewCtrl', function($scope, database)
{
	$scope.apiToken = ''

	$scope.languages = {}

	$scope.init = function()
	{
		database.languagesRef().on('value', snapLanguages =>
		{	
			$scope.languages = database.languagesFromSnap(snapLanguages)

			database.segmentsRef().on('value', snapSegments =>
			{
				const segments = database.segmentsFromSnap(snapSegments)
				const summary = $scope.summary($scope.languages, segments)

				for (const index in summary)
				{
					$scope.languages[index].translated = summary[index].translated
					$scope.languages[index].validated  = summary[index].validated
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
			width: value + '%'
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
		downloadFile('https://' + window.location.host + '/api/export/' + language.code + '/android')
	}

	$scope.exportIOS = function(language)
	{
		downloadFile('https://' + window.location.host + '/api/export/' + language.code + '/ios')
	}

	$scope.openProfileDialog = function()
	{
		controllerById('dialog-profile').open()
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

		database.addLanguageRef(entry)
	}

	$scope.openEditLanguageDialog = function(language)
	{
		controllerById('dialog-language').openEdit(language)
	}

	$scope.editLanguage = function(id, value)
	{
		const entry = {
			code: value
		}

		database.updateLanguageRef(id, entry)
	}

	$scope.openDeleteLanguageDialog = function(language)
	{
		controllerById('dialog-delete-language').open(language)
	}

	$scope.deleteLanguage = function(id)
	{
		database.removeLanguageRef(id)
	}

	$scope.init()
})