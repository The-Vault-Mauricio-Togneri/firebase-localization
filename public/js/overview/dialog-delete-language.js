app.controller(DIALOG_DELETE_LANGUAGE, function($scope, database)
{
	$scope.form = {
		id: '',
		name: ''
	}

	$scope.open = function(language)
	{
		$scope.form.id   = language.id
		$scope.form.name = language.fullName

		openDialog(DIALOG_DELETE_LANGUAGE)
	}

	$scope.onDelete = function(id)
	{
		controllerById(CONTROLLER_OVERVIEW).deleteLanguage(id)

		closeDialog(DIALOG_DELETE_LANGUAGE)
	}
})