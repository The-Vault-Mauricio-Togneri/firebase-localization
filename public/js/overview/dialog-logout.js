app.controller(DIALOG_LOGOUT, function($scope)
{
	$scope.open = function()
	{
		openDialog(DIALOG_LOGOUT)
	}

	$scope.onLogout = function(id)
	{
		controller(CONTROLLER_OVERVIEW).logout()

		closeDialog(DIALOG_LOGOUT)
	}
})