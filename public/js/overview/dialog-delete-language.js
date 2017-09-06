app.controller('dialogDeleteLanguage', function($scope, database)
{
	$scope.form = {
		id: '',
		name: ''
	}

	$scope.open = function(language)
	{
		$scope.form.id   = language.id
		$scope.form.name = language.fullName

		openDialog('dialog-delete-language')
	}

	$scope.onDelete = function(id)
	{
		controllerById('overview-controller').deleteLanguage(id)

		closeDialog('dialog-delete-language')
	}
})