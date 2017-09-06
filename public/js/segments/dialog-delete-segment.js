app.controller('dialogDeleteSegment', function($scope)
{
	$scope.form = {
		id: '',
		key: ''
	}

	$scope.open = function(segment)
	{
		$scope.form.id  = segment.id
		$scope.form.key = segment.key

		openDialog('dialog-delete-segment')
	}

	$scope.onDeleteSegment = function(form)
	{
		controllerById('segments-controller').deleteSegment(form.id)

		closeDialog('dialog-delete-segment')
	}
})