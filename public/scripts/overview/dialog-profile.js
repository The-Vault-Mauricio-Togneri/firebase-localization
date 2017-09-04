app.controller('overviewDialogProfileCtrl', function($scope, database)
{
	$scope.dialog = {
		password: '',
		passwordConfirmation: ''
	}

	$scope.open = function()
	{
		$scope.dialog.password = ''
		$scope.dialog.passwordConfirmation = ''

		$('#profile-dialog').modal()
	}

	$scope.onUpdatePassword = function(password)
	{
		firebase.auth().currentUser.updatePassword(password).catch(function(error)
		{
			showError(error.message)
		})

		$('#profile-dialog').modal('hide')
	}

	$scope.openLogoutDialog = function()
	{
		controllerById('logout-dialog').open()
	}
})