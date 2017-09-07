app.controller(DIALOG_ERROR_MESSAGE, function($scope)
{
	$scope.message = ''

	$scope.show = function(message)
	{
		$scope.message = message

		setTimeout(function()
		{
			$scope.message = ''
			$scope.$applyAsync()
		}, 3000)
	}
})