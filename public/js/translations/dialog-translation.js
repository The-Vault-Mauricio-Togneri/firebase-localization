app.controller('translationsDialogTranslationCtrl', function($scope)
{
	$scope.form = {
		id: '',
		key: '',
		locales: {},
		description: '',
		tags: '',
		maxLength: '',
		screenshot: '',
		isPlural: false,
		isArray: false,
		formError: false
	}

	$scope.openAdd = function(locales)
	{
		$scope.form.id          = ''
		$scope.form.key         = ''
		$scope.form.description = ''
		$scope.form.tags        = ''
		$scope.form.maxLength   = ''
		$scope.form.screenshot  = ''
		$scope.form.isPlural    = false
		$scope.form.isArray     = false

		for (const index in locales)
		{
			$scope.form.locales[index] = {
				value: '',
				oldValue: null,
				validated: false
			}
		}
	
		open()
	}

	$scope.openEdit = function(locales, translation)
	{
		$scope.form.id          = translation.id
		$scope.form.key         = translation.key
		$scope.form.description = translation.description
		$scope.form.tags        = translation.tags
		$scope.form.maxLength   = translation.maxLength
		$scope.form.screenshot  = translation.screenshot
		$scope.form.isPlural    = translation.isPlural
		$scope.form.isArray     = translation.isArray

		for (const index in locales)
		{
			$scope.form.locales[index] = {
				value: translation.locales[index].value,
				oldValue: translation.locales[index].value,
				validated: translation.locales[index].validated,
				history: translation.locales[index].history,
			}
		}
	
		open()
	}

	function open()
	{
		$scope.form.formError = false
		
		$('#dialog-translation').on('shown.bs.modal', function()
		{
			$('#dialog-translation-key').focus()
		})

		$('#dialog-translation-tabs a:first').tab('show')

		$('#dialog-translation').on('shown.bs.tab', function(event)
		{
			if (event.target.href.includes('#dialog-translation-tab-translations'))
			{
				$('#dialog-translation-key').focus()
			}
			else if (event.target.href.includes('#dialog-translation-tab-properties'))
			{
				$('#dialog-translation-description').focus()
			}
		})

		openDialog('dialog-translation')
	}

	function translationFormValid(form)
	{
		if (!form.key)
		{
			$scope.form.formError = true
			$('#dialog-translation-tabs a:first').tab('show')
			$('#dialog-translation-key').focus()
		}
		else
		{
			return true
		}
	}

	$scope.onAddTranslation = function(form)
	{
		if (translationFormValid(form))
		{
			controllerById('translations-controller').addTranslation(form)

			closeDialog('dialog-translation')
		}
	}

	$scope.onEditTranslation = function(form)
	{
		if (translationFormValid(form))
		{
			controllerById('translations-controller').editTranslation(form)

			closeDialog('dialog-translation')
		}
	}

	$scope.openTranslationHistory = function(history)
	{
		controllerById('dialog-translation-history').open(history)
	}

	$scope.openTranslationComments = function(localeId, comments)
	{
		controllerById('dialog-translation-comments').open($scope.form.id, localeId, comments)
	}
})