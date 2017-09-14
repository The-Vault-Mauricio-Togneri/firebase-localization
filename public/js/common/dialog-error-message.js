app.controller(DIALOG_MESSAGE, function($scope)
{
	$scope.message = ''
	$scope.type = ''

	$scope.showError = function(message)
	{
		$scope.show(message, 'alert-danger')
	}

	$scope.showSuccess = function(message)
	{
		$scope.show(message, 'alert-success')
	}

	$scope.show = function(message, type)
	{
		$scope.message = message
		$scope.type = type

		setTimeout(function()
		{
			$scope.message = ''
			$scope.type = ''
			$scope.$applyAsync()
		}, 3000)
	}
})