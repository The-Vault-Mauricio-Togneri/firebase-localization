app.controller(DIALOG_PROFILE, function($scope, ui)
{
	$scope.form = {
		password: '',
		passwordConfirmation: ''
	}

	$scope.open = function()
	{
		$scope.form.password = ''
		$scope.form.passwordConfirmation = ''

		ui.openDialog(DIALOG_PROFILE)
	}

	$scope.onCopyToken = function()
	{
		const input = $('#input-token')

		input.select()
		document.execCommand('copy')
		input.focus()
		input.val(input.val())
	}

	$scope.onUpdatePassword = function(password)
	{
		controller(CONTROLLER_OVERVIEW).updateProfile(password)

		ui.closeDialog(DIALOG_PROFILE)
	}

	$scope.openLogoutDialog = function()
	{
		controller(DIALOG_LOGOUT).open()
	}
})