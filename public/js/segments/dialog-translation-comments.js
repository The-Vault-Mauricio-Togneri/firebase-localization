app.controller(DIALOG_TRANSLATION_COMMENTS, function($scope)
{
	$scope.segmentId = ''
	$scope.languageId = ''

	$scope.form = {
		comments: [],
		newComment: ''
	}

	$scope.open = function(segmentId, languageId, comments)
	{
		$scope.segmentId = segmentId
		$scope.languageId = languageId

		$scope.form.comments = []

		for (const index in comments)
		{
			$scope.form.comments.push(comments[index])
		}

		$scope.form.comments = $scope.form.comments.reverse()

		openDialog(DIALOG_TRANSLATION_COMMENTS)
	}

	$scope.createNewComment = function(form)
	{
		const comment = {
			author: firebase.auth().currentUser.email,
			date: Date.now(),
			value: form.newComment
		}

		$scope.form.newComment = ''
		$scope.form.comments.unshift(comment)

		controllerById(CONTROLLER_SEGMENTS).createNewComment($scope.segmentId, $scope.languageId, comment)
	}
})