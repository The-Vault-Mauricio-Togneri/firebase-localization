app.controller('overviewDialogProfileCtrl', function($scope)
{
	$scope.form = {
		password: '',
		passwordConfirmation: ''
	}

	$scope.open = function()
	{
		$scope.form.password = ''
		$scope.form.passwordConfirmation = ''

		$('#profile-dialog').on('shown.bs.modal', function()
		{
			$('#profile-dialog-password').focus()
		})

		openDialog('profile-dialog')
	}

	$scope.onUpdatePassword = function(password)
	{
		controllerById('overview-controller').updateProfile(password)

		closeDialog('profile-dialog')
	}

	$scope.openLogoutDialog = function()
	{
		controllerById('logout-dialog').open()
	}
})