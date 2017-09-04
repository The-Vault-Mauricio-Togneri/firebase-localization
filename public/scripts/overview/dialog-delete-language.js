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

		$('#delete-language-dialog').modal()
	}

	$scope.onDelete = function(id)
	{
		database.removeLocaleRef(id)

		$('#delete-language-dialog').modal('hide')
	}
})