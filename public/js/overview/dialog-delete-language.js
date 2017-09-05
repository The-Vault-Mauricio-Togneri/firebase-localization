app.controller('overviewDialogDeleteLanguageCtrl', function($scope, database)
{
	$scope.form = {
		id: '',
		name: ''
	}

	$scope.open = function(locale)
	{
		$scope.form.id   = locale.id
		$scope.form.name = locale.fullName

		openDialog('dialog-delete-language')
	}

	$scope.onDelete = function(id)
	{
		controllerById('overview-controller').deleteLanguage(id)

		closeDialog('dialog-delete-language')
	}
})