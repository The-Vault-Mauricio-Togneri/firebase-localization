app.controller(DIALOG_PROFILE, function($scope)
{
	$scope.form = {
		password: '',
		passwordConfirmation: ''
	}

	$scope.open = function()
	{
		$scope.form.password = ''
		$scope.form.passwordConfirmation = ''

		dialog(DIALOG_PROFILE).on('shown.bs.modal', function()
		{
			focus('dialog-profile-password')
		})

		openDialog(DIALOG_PROFILE)
	}

	$scope.onUpdatePassword = function(password)
	{
		controllerById(CONTROLLER_OVERVIEW).updateProfile(password)

		closeDialog(DIALOG_PROFILE)
	}

	$scope.openLogoutDialog = function()
	{
		controllerById(DIALOG_LOGOUT).open()
	}
})