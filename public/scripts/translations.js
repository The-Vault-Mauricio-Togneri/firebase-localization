app.controller('translationsCtrl', function($scope, database)
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
	
	$scope.init = function()
	{
		database.localesRef().once('value', snapLocales =>
		{	
			$scope.locales = database.localesFromSnap(snapLocales)

			for (const index in $scope.locales)
			{
				$scope.filter.locale[index] = true
			}
	
			database.translationsRef().once('value', snapTranslations =>
			{
				$scope.translations = database.translationsFromSnap(snapTranslations)
				orderTranslations()
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
		database.updateTranslationRef(translation.id + '/key', translation.key)

		orderTranslations()
	}

	$scope.onTranslationValueUpdated = function(translation, locale)
	{
		const newValue = translation.locales[locale.id].value
		const oldValue = translation.locales[locale.id].oldValue

		if (newValue != oldValue)
		{
			database.updateTranslationRef(translation.id + '/locales/' + locale.id + '/value', newValue)
			translation.locales[locale.id].oldValue = newValue

			if (translation.locales[locale.id].validated)
			{
				updateTranslationValidated(translation, locale, false)
			}
		}
	}

	$scope.onTranslationValidatedChanged = function(translation, locale)
	{
		updateTranslationValidated(translation, locale, !translation.locales[locale.id].validated)
	}

	function updateTranslationValidated(translation, locale, value)
	{
		translation.locales[locale.id].validated = value
		database.updateTranslationRef(translation.id + '/locales/' + locale.id + '/validated', value)
	}

	$scope.openAddTranslationDialog = function()
	{
		controllerById('translation-dialog').openAdd($scope.locales)
	}

	$scope.addNewTranslation = function(form)
	{
		const entry = {
			key: form.key,
			description: form.description,
			tags: form.tags,
			maxLength: form.maxLength,
			screenshot: form.screenshot,
			isPlural: form.isPlural,
			isArray: form.isArray,
			locales: form.locales
		}

		const ref = database.addTranslationRef(entry)
		const translation = new Translation(ref.key, entry)

		$scope.translations.push(translation)
		orderTranslations()
	}

	$scope.openEditTranslationDialog = function(translation)
	{
		controllerById('translation-dialog').openEdit($scope.locales, translation)
	}

	$scope.editExistingTranslation = function(form)
	{
		const entry = {
			key: form.key,
			description: form.description,
			tags: form.tags,
			maxLength: form.maxLength,
			screenshot: form.screenshot,
			isPlural: form.isPlural,
			isArray: form.isArray,
			locales: {}
		}

		const sourceTranslation = translationById(form.id)
		sourceTranslation.key         = form.key
		sourceTranslation.description = form.description
		sourceTranslation.tags        = form.tags
		sourceTranslation.maxLength   = form.maxLength
		sourceTranslation.screenshot  = form.screenshot
		sourceTranslation.isPlural    = form.isPlural
		sourceTranslation.isArray     = form.isArray

		for (const index in form.locales)
		{
			const locale = form.locales[index]

			entry.locales[index] = {
				value: locale.value,
				validated: locale.validated && (locale.value == locale.oldValue)
			}

			sourceTranslation.locales[index].value     = entry.locales[index].value
			sourceTranslation.locales[index].validated = entry.locales[index].validated
		}
		
		orderTranslations()
		database.updateTranslationRef(form.id, entry)
	}

	function translationById(id)
	{
		const index = translationIndexById(id)

		return (index != -1) ? $scope.translations[index] : null
	}

	function translationIndexById(id)
	{
		for (const index in $scope.translations)
		{
			if ($scope.translations[index].id == id)
			{
				return index
			}
		}

		return -1
	}

	$scope.openDeleteTranslationDialog = function(translation)
	{
		controllerById('delete-translation-dialog').open(translation)
	}

	$scope.deleteTranslation = function(id)
	{
		const index = translationIndexById(id)
		$scope.translations.splice(index, 1)
		
		orderTranslations()
		database.removeTranslationRef(id)

		$('#translation-dialog').modal('hide')
	}

	$scope.translationValidatedState = function(value)
	{
		return value ? 'translation-checkbox-on' : 'translation-checkbox-off'
	}
	
	$scope.displayByState = function(translation)
	{
		const translated = ($scope.filter.state.translated ? translation.hasTranslated() : false)
		const notTranslated = ($scope.filter.state.notTranslated ? translation.hasNotTranslated() : false)
		const validated = ($scope.filter.state.validated ? translation.hasValidated() : false)
		const notValidated = ($scope.filter.state.notValidated ? translation.hasNotValidated() : false)
		const byText = ($scope.filter.content ? translation.contains($scope.filter.content.toLowerCase()) : true)

		return (translated || notTranslated || validated || notValidated) && byText
	}

	function orderTranslations()
	{
		$scope.translations = $scope.translations.sort(function(a, b)
		{
			return (a.key < b.key) ? -1 : (a.key > b.key)
		})
	}

	$scope.init()
})