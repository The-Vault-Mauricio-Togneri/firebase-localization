app.controller('dialogProfile', function($scope)
{
	$scope.form = {
		password: '',
		passwordConfirmation: ''
	}

	$scope.open = function()
	{
		$scope.form.password = ''
		$scope.form.passwordConfirmation = ''

		$('#dialog-profile').on('shown.bs.modal', function()
		{
			$('#dialog-profile-password').focus()
		})

		openDialog('dialog-profile')
	}

	$scope.onUpdatePassword = function(password)
	{
		controllerById('overview-controller').updateProfile(password)

		closeDialog('dialog-profile')
	}

	$scope.openLogoutDialog = function()
	{
		controllerById('dialog-logout').open()
	}
})