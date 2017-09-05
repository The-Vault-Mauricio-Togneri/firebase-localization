app.controller('overviewDialogLogoutCtrl', function($scope)
{
	$scope.open = function()
	{
		openDialog('dialog-logout')
	}

	$scope.onLogout = function(id)
	{
		controllerById('overview-controller').logout()

		closeDialog('dialog-logout')
	}
})