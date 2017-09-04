app.controller('overviewDialogProfileCtrl', function($scope)
{
	$scope.dialog = {
		password: '',
		passwordConfirmation: ''
	}

	$scope.open = function()
	{
		$scope.dialog.password = ''
		$scope.dialog.passwordConfirmation = ''

		openDialog('profile-dialog')
	}

	$scope.onUpdatePassword = function(password)
	{
		firebase.auth().currentUser.updatePassword(password).catch(function(error)
		{
			showError(error.message)
		})

		openDialog('profile-dialog')
	}

	$scope.openLogoutDialog = function()
	{
		controllerById('logout-dialog').open()
	}
})