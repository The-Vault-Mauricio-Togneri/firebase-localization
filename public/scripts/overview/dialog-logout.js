app.controller('overviewDialogLogoutCtrl', function($scope)
{
	$scope.open = function()
	{
		openDialog('logout-dialog')
	}

	$scope.onLogout = function(id)
	{
		controllerById('overview-controller').logout()

		closeDialog('logout-dialog')
	}
})