app.controller('translationsDialogDeleteTranslationCtrl', function($scope)
{
	$scope.form = {
		id: '',
		key: ''
	}

	$scope.open = function(translation)
	{
		$scope.form.id  = translation.id
		$scope.form.key = translation.key

		openDialog('delete-translation-dialog')
	}

	$scope.onDeleteTranslation = function(form)
	{
		controllerById('translations-controller').deleteTranslation(form.id)

		closeDialog('delete-translation-dialog')
	}
})