app.controller(DIALOG_LOGOUT, function($scope, ui)
{
	$scope.open = function()
	{
		ui.openDialog(DIALOG_LOGOUT)
	}

	$scope.onLogout = function(id)
	{
		controller(CONTROLLER_OVERVIEW).logout()

		ui.closeDialog(DIALOG_LOGOUT)
	}
})