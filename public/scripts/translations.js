angular.module('translationsApp', []).controller('translationsCtrl', function($scope)
{
	$scope.locales = []
	$scope.translations = []
	$scope.filter = {
		content: '',
		locale: [],
		state: {
			translated: true,
			notTranslated: true,
			validated: true,
			notValidated: true
		}
	}

	$scope.dialog = []
	$scope.dialog.translation = 
	{
		key: '',
		locales: [],
		description: '',
		tags: '',
		maxLength: '',
		screenshot: '',
		isPlural: false,
		isArray: false
	}
	
	$scope.init = function()
	{
		localesRef().once('value', snapLocales =>
		{	
			$scope.locales = localesFromSnap(snapLocales)

			for (var index in $scope.locales)
			{
				var locale = $scope.locales[index]
				$scope.filter.locale[locale.key] = true
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

	$scope.onTranslationKeyUpdated = function(translation, value)
	{
		onNodeUpdated(translation.key + '/code', value)
	}

	$scope.onTranslationValueUpdated = function(translation, locale, value)
	{
		onNodeUpdated(translation.key + '/locales/' + locale.key + '/value', value)

		updateTranslationValidated(translation, locale, false)
	}

	$scope.onTranslationValidatedChanged = function(translation, locale)
	{
		updateTranslationValidated(translation, locale, !translation.locales[locale.key].validated)
	}

	function updateTranslationValidated(translation, locale, value)
	{
		translation.locales[locale.key].validated = value
		onNodeUpdated(translation.key + '/locales/' + locale.key + '/validated', value)
	}

	$scope.openAddTranslationDialog = function()
	{
		$scope.dialog.translation.key         = ''
		$scope.dialog.translation.description = ''
		$scope.dialog.translation.tags        = ''
		$scope.dialog.translation.maxLength   = ''
		$scope.dialog.translation.screenshot  = ''
		$scope.dialog.translation.isPlural    = false
		$scope.dialog.translation.isArray     = false

		for (var index in $scope.locales)
		{
			var locale = $scope.locales[index]

			$scope.dialog.translation.locales[locale.key] = ''
		}
	
		$('#translation-dialog').on('shown.bs.modal', function()
		{
			$('#translation-dialog-key').focus()
		})

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
			code: form.key,
			description: form.description,
			tags: form.tags,
			maxLength: form.maxLength,
			screenshot: form.screenshot,
			isPlural: form.isPlural,
			isArray: form.isArray,
			locales: []
		}
		
		for (var index in form.locales)
		{
			value.locales[index] = {
				value: form.locales[index],
				validated: false
			}
		}
	
		translationsRef().push(value)
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