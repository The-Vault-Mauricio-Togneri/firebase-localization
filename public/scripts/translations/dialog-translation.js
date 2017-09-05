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
				validated: translation.locales[index].validated
			}
		}
	
		open()
	}

	function open()
	{
		$scope.form.formError = false
		
		$('#translation-dialog').on('shown.bs.modal', function()
		{
			$('#translation-dialog-key').focus()
		})

		$('#translation-dialog-tabs a:first').tab('show')

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

		openDialog('translation-dialog')
	}

	function translationFormValid(form)
	{
		if (!form.key)
		{
			$scope.form.formError = true
			$('#translation-dialog-tabs a:first').tab('show')
			$('#translation-dialog-key').focus()
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
			controllerById('translations-controller').addNewTranslation(form)

			closeDialog('translation-dialog')
		}
	}

	$scope.onEditTranslation = function(form)
	{
		if (translationFormValid(form))
		{
			controllerById('translations-controller').editExistingTranslation(form)

			closeDialog('translation-dialog')
		}
	}
})