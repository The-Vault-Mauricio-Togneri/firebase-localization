app.controller('overviewDialogLanguageCtrl', function($scope, database)
{
	$scope.dialog = {
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
		$scope.dialog.id = id
		$scope.dialog.originalCode = select
		$scope.dialog.buttonDisabled = true

		$('#language-dialog-select').val(select).trigger('change.select2')
		openDialog('language-dialog')
	}

	$scope.onLanguageSelected = function()
	{
		const value = byId('language-dialog-select').value
		
		$scope.dialog.buttonDisabled = (value == $scope.dialog.originalCode)
		$scope.$applyAsync()
	}

	$scope.onAddLanguage = function(form)
	{
		var value = {
			code: byId('language-dialog-select').value
		}

		database.addLocaleRef(value)

		closeDialog('language-dialog')
	}

	$scope.onEditLanguage = function(form)
	{
		var value = {
			code: byId('language-dialog-select').value
		}

		database.updateLocaleRef(form.id, value)

		closeDialog('language-dialog')
	}
})