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

		$('#language-dialog-select').val(select).trigger('change.select2')
		openDialog('language-dialog')
	}

	$scope.onLanguageSelected = function()
	{
		const value = byId('language-dialog-select').value
		
		$scope.form.buttonDisabled = (value == $scope.form.originalCode)
		$scope.$applyAsync()
	}

	$scope.onAddLanguage = function()
	{
		controllerById('overview-controller').addLanguage(byId('language-dialog-select').value)

		closeDialog('language-dialog')
	}

	$scope.onEditLanguage = function(form)
	{
		controllerById('overview-controller').editLanguage(form.id, byId('language-dialog-select').value)

		closeDialog('language-dialog')
	}
})