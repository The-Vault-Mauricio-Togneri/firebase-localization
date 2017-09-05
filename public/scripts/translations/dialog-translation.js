app.controller('translationsDialogTranslationCtrl', function($scope)
{
	$scope.dialog = {
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
		$scope.dialog.id          = ''
		$scope.dialog.key         = ''
		$scope.dialog.description = ''
		$scope.dialog.tags        = ''
		$scope.dialog.maxLength   = ''
		$scope.dialog.screenshot  = ''
		$scope.dialog.isPlural    = false
		$scope.dialog.isArray     = false

		for (const index in locales)
		{
			$scope.dialog.locales[index] = {
				value: '',
				oldValue: null,
				validated: false
			}
		}
	
		open()
	}

	$scope.openEdit = function(locales, translation)
	{
		$scope.dialog.id          = translation.id
		$scope.dialog.key         = translation.key
		$scope.dialog.description = translation.description
		$scope.dialog.tags        = translation.tags
		$scope.dialog.maxLength   = translation.maxLength
		$scope.dialog.screenshot  = translation.screenshot
		$scope.dialog.isPlural    = translation.isPlural
		$scope.dialog.isArray     = translation.isArray

		for (const index in locales)
		{
			$scope.dialog.locales[index] = {
				value: translation.locales[index].value,
				oldValue: translation.locales[index].value,
				validated: translation.locales[index].validated
			}
		}
	
		open()
	}

	function open()
	{
		$scope.dialog.formError = false
		
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
			$scope.dialog.formError = true
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