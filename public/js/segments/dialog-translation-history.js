app.controller(DIALOG_TRANSLATION_HISTORY, function($scope, ui)
{
	$scope.history = []

	$scope.open = function(history)
	{
		$scope.history = []

		for (const index in history)
		{
			$scope.history.push(history[index])
		}

		$scope.history = $scope.history.reverse()

		ui.openDialog(DIALOG_TRANSLATION_HISTORY)
	}
})