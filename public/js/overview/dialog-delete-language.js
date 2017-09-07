app.controller(DIALOG_DELETE_LANGUAGE, function($scope, database, ui)
{
	$scope.form = {
		id: '',
		name: ''
	}

	$scope.open = function(language)
	{
		$scope.form.id   = language.id
		$scope.form.name = language.fullName

		ui.openDialog(DIALOG_DELETE_LANGUAGE)
	}

	$scope.onDelete = function(id)
	{
		controller(CONTROLLER_OVERVIEW).deleteLanguage(id)

		ui.closeDialog(DIALOG_DELETE_LANGUAGE)
	}
})