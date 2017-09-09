app.controller(DIALOG_TRANSLATION_COMMENTS, function($scope, ui)
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

		ui.openDialog(DIALOG_TRANSLATION_COMMENTS)
	}

	$scope.createNewComment = function(form)
	{
		const comment = {
			value: form.newComment,
			author: firebase.auth().currentUser.email,
			date: Date.now()
		}

		$scope.form.newComment = ''
		$scope.form.comments.unshift(comment)

		controller(CONTROLLER_SEGMENTS).createNewComment($scope.segmentId, $scope.languageId, comment)
	}
})