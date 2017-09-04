app.controller('overviewDialogDeleteLanguageCtrl', function($scope, database)
{
	$scope.dialog = {
		id: '',
		name: ''
	}

	$scope.open = function(locale)
	{
		$scope.dialog.id   = locale.id
		$scope.dialog.name = locale.fullName

		openDialog('delete-language-dialog')
	}

	$scope.onDelete = function(id)
	{
		database.removeLocaleRef(id)

		closeDialog('delete-language-dialog')
	}
})