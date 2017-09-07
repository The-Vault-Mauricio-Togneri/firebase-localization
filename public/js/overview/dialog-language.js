app.controller(DIALOG_LANGUAGE, function($scope, database)
{
	$scope.form = {
		id: '',
		originalCode: '',
		buttonDisabled: true
	}

	$scope.openAdd = function()
	{
		open(null, '')
	}

	$scope.openEdit = function(language)
	{
		open(language.id, language.code)
	}

	function open(id, select)
	{
		$scope.form.id = id
		$scope.form.originalCode = select
		$scope.form.buttonDisabled = true

		$('#dialog-language-select').val(select).trigger('change.select2')
		openDialog(DIALOG_LANGUAGE)
	}

	$scope.onLanguageSelected = function()
	{
		const value = byId('dialog-language-select').value
		
		$scope.form.buttonDisabled = (value == $scope.form.originalCode)
		$scope.$applyAsync()
	}

	$scope.onAdd = function()
	{
		controller(CONTROLLER_OVERVIEW).addLanguage(byId('dialog-language-select').value)

		closeDialog(DIALOG_LANGUAGE)
	}

	$scope.onEdit = function(form)
	{
		controller(CONTROLLER_OVERVIEW).editLanguage(form.id, byId('dialog-language-select').value)

		closeDialog(DIALOG_LANGUAGE)
	}
})