app.controller('translationsDialogTranslationCommentsCtrl', function($scope)
{
	$scope.translationId = ''
	$scope.localeId = ''

	$scope.form = {
		comments: [],
		newComment: ''
	}

	$scope.open = function(translationId, localeId, comments)
	{
		$scope.translationId = translationId
		$scope.localeId = localeId

		$scope.form.comments = []

		for (const index in comments)
		{
			$scope.form.comments.push(comments[index])
		}

		$scope.form.comments = $scope.form.comments.reverse()

		openDialog('dialog-translation-comments')
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

		controllerById('translations-controller').createNewComment($scope.translationId, $scope.localeId, comment)
	}
})