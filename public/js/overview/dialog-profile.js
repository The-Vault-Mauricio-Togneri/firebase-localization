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
		controller(CONTROLLER_OVERVIEW).updateProfile(password)

		closeDialog(DIALOG_PROFILE)
	}

	$scope.openLogoutDialog = function()
	{
		controller(DIALOG_LOGOUT).open()
	}
})