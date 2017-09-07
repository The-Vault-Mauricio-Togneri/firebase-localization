app.controller(DIALOG_LANGUAGE, function($scope, database, ui)
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

		setSelectValue(select)
		ui.openDialog(DIALOG_LANGUAGE)
	}

	function getSelectValue()
	{
		return $('.js-example-placeholder-single').val()
	}

	function setSelectValue(value)
	{
		$('.js-example-placeholder-single').val(value).trigger('change.select2')
	}

	$scope.onLanguageSelected = function()
	{
		$scope.form.buttonDisabled = (getSelectValue() == $scope.form.originalCode)
		$scope.$applyAsync()
	}

	$scope.onAdd = function()
	{
		controller(CONTROLLER_OVERVIEW).addLanguage(getSelectValue())

		ui.closeDialog(DIALOG_LANGUAGE)
	}

	$scope.onEdit = function(form)
	{
		controller(CONTROLLER_OVERVIEW).editLanguage(form.id, getSelectValue())

		ui.closeDialog(DIALOG_LANGUAGE)
	}
})