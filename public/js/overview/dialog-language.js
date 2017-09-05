app.controller('overviewDialogLanguageCtrl', function($scope, database)
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

	$scope.openEdit = function(locale)
	{
		open(locale.id, locale.code)
	}

	function open(id, select)
	{
		$scope.form.id = id
		$scope.form.originalCode = select
		$scope.form.buttonDisabled = true

		$('#dialog-language-select').val(select).trigger('change.select2')
		openDialog('dialog-language')
	}

	$scope.onLanguageSelected = function()
	{
		const value = byId('dialog-language-select').value
		
		$scope.form.buttonDisabled = (value == $scope.form.originalCode)
		$scope.$applyAsync()
	}

	$scope.onAdd = function()
	{
		controllerById('overview-controller').addLanguage(byId('dialog-language-select').value)

		closeDialog('dialog-language')
	}

	$scope.onEdit = function(form)
	{
		controllerById('overview-controller').editLanguage(form.id, byId('dialog-language-select').value)

		closeDialog('dialog-language')
	}
})