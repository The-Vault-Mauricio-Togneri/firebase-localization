angular.module('translationsApp', []).controller('translationsCtrl', function($scope)
{
	$scope.locales = {}
	$scope.translations = {}
	$scope.filter = {
		content: '',
		locale: {},
		state: {
			translated: true,
			notTranslated: true,
			validated: true,
			notValidated: true
		}
	}

	$scope.dialog = {
		translation: {
			id: '',
			key: '',
			locales: {},
			description: '',
			tags: '',
			maxLength: '',
			screenshot: '',
			isPlural: false,
			isArray: false
		}
	}
	
	$scope.init = function()
	{
		localesRef().once('value', snapLocales =>
		{	
			$scope.locales = localesFromSnap(snapLocales)

			for (var index in $scope.locales)
			{
				$scope.filter.locale[index] = true
			}
	
			translationsRef().once('value', snapTranslations =>
			{
				$scope.translations = translationsFromSnap(snapTranslations)
				$scope.$applyAsync()
				displayContent()
			})
		})

		$('#collapseFilter').on('shown.bs.collapse', function()
		{
			$('#filter-content-input').focus()
		})
	}

	$scope.onTranslationKeyUpdated = function(translation)
	{
		onNodeUpdated(translation.id + '/key', translation.key)
	}

	$scope.onTranslationValueUpdated = function(translation, locale)
	{
		const newValue = translation.locales[locale.id].value
		const oldValue = translation.locales[locale.id].oldValue

		if (newValue != oldValue)
		{
			onNodeUpdated(translation.id + '/locales/' + locale.id + '/value', newValue)
			translation.locales[locale.id].oldValue = newValue
			updateTranslationValidated(translation, locale, false)
		}
	}

	$scope.onTranslationValidatedChanged = function(translation, locale)
	{
		updateTranslationValidated(translation, locale, !translation.locales[locale.id].validated)
	}

	function updateTranslationValidated(translation, locale, value)
	{
		translation.locales[locale.id].validated = value
		onNodeUpdated(translation.id + '/locales/' + locale.id + '/validated', value)
	}

	$scope.openAddTranslationDialog = function()
	{
		$scope.dialog.translation.id          = ''
		$scope.dialog.translation.key         = ''
		$scope.dialog.translation.description = ''
		$scope.dialog.translation.tags        = ''
		$scope.dialog.translation.maxLength   = ''
		$scope.dialog.translation.screenshot  = ''
		$scope.dialog.translation.isPlural    = false
		$scope.dialog.translation.isArray     = false

		for (var index in $scope.locales)
		{
			$scope.dialog.translation.locales[index] = ''
		}
	
		displayTranslationDialog('Add')
	}

	$scope.openEditTranslationDialog = function(translation)
	{
		$scope.dialog.translation.id          = translation.id
		$scope.dialog.translation.key         = translation.key
		$scope.dialog.translation.description = translation.description
		$scope.dialog.translation.tags        = translation.tags
		$scope.dialog.translation.maxLength   = translation.maxLength
		$scope.dialog.translation.screenshot  = translation.screenshot
		$scope.dialog.translation.isPlural    = translation.isPlural
		$scope.dialog.translation.isArray     = translation.isArray

		for (var index in $scope.locales)
		{
			$scope.dialog.translation.locales[index] = translation.locales[index].value
		}
	
		displayTranslationDialog('Edit')
	}

	function displayTranslationDialog(buttonText)
	{
		byId('translation-button-ok').innerHTML = buttonText

		$('#translation-dialog').on('shown.bs.modal', function()
		{
			$('#translation-dialog-key').focus()
		})

		$('#translation-dialog-tabs a:first').tab('show');

		$('#translation-dialog').on('shown.bs.tab', function(event)
		{
			if (event.target.href.includes('#translation-dialog-tab-translations'))
			{
				$('#translation-dialog-key').focus()
			}
			else if (event.target.href.includes('#translation-dialog-tab-properties'))
			{
				$('#translation-dialog-description').focus()
			}
		})

		$('#translation-dialog').modal()
	}

	$scope.onAddTranslation = function(form)
	{
		var value = {
			key: form.key,
			description: form.description,
			tags: form.tags,
			maxLength: form.maxLength,
			screenshot: form.screenshot,
			isPlural: form.isPlural,
			isArray: form.isArray,
			locales: {}
		}

		if (form.id)
		{
			for (var index in form.locales)
			{
				value.locales[index] = {
					value: form.locales[index]
				}
			}
			
			onNodeUpdated(form.id, value)
		}
		else
		{
			for (var index in form.locales)
			{
				value.locales[index] = {
					value: form.locales[index],
					validated: false
				}
			}
		
			translationsRef().push(value)
		}
	}

	$scope.translationValidatedState = function(value)
	{
		return value ? 'translation-checkbox-on' : 'translation-checkbox-off'
	}
	
	$scope.displayByState = function(translation)
	{
		var translated = ($scope.filter.state.translated ? translation.hasTranslated() : false)
		var notTranslated = ($scope.filter.state.notTranslated ? translation.hasNotTranslated() : false)
		var validated = ($scope.filter.state.validated ? translation.hasValidated() : false)
		var notValidated = ($scope.filter.state.notValidated ? translation.hasNotValidated() : false)
		var byText = ($scope.filter.content ? translation.contains($scope.filter.content.toLowerCase()) : true)

		return (translated || notTranslated || validated || notValidated) && byText
	}

	function onNodeUpdated(id, value)
	{
		console.log('Update: ' + id + ' => ' + value)

		translationsEntryRef(id).set(value, function(error)
		{
			if (error)
			{
				console.log('Data could not be saved: ' + error)
			}
			else
			{
				console.log('Data saved successfully')
			}
		})
	}

	$scope.init()
})