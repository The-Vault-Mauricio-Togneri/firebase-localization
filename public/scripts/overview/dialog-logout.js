app.controller('overviewDialogLogoutCtrl', function($scope, database)
{
	$scope.open = function()
	{
		$('#logout-dialog').modal()
	}

	$scope.onLogout = function(id)
	{
		$('#logout-dialog').modal('hide')

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