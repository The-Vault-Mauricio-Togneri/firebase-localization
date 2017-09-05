app.controller('translationsDialogTranslationHistoryCtrl', function($scope)
{
	$scope.history = []

	$scope.open = function(history)
	{
		for (const index in history)
		{
			$scope.history.push(history[index])
		}

		$scope.history = $scope.history.reverse()

		openDialog('dialog-translation-history')
	}
})