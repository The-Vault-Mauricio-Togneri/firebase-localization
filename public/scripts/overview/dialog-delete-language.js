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

		openDialog('delete-language-dialog')
	}

	$scope.onDelete = function(id)
	{
		controllerById('overview-controller').deleteLanguage(id)

		closeDialog('delete-language-dialog')
	}
})