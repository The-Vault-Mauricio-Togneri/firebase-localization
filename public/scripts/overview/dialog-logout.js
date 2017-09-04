app.controller('overviewDialogLogoutCtrl', function($scope)
{
	$scope.open = function()
	{
		openDialog('logout-dialog')
	}

	$scope.onLogout = function(id)
	{
		closeDialog('logout-dialog')

		firebase.auth().signOut().then(function()
		{
			window.location.href = '/'
		},
		function(error)
		{
			console.log(error)
		})
	}
})