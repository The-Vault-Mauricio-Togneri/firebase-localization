firebase.auth().onAuthStateChanged(function(user)
{
	if (user)
	{
		window.location.href = '/overview'
	}
	else
	{
		const form = document.getElementById('form')
		form.style.visibility = 'visible'
	}
})

app.controller('loginCtrl', function($scope)
{
	$scope.form = {
		email: '',
		password: '',
		loading: false,
		error: ''
	}

	$scope.login = function(email, password)
	{
		$scope.form.error = ''
		$scope.form.loading = true

		firebase.auth().signInWithEmailAndPassword(email, password)
		.catch(function(error)
		{
			$scope.form.loading = false
			$scope.$applyAsync()
	
			$scope.form.error = error.message
		})
	}
})

function login2()
{
	const email = document.getElementById('form.email')
	const password = document.getElementById('form.password')
	const button = document.getElementById('form.button')

	const buttonNormal = document.getElementById('form.button.normal')
	const buttonLoading = document.getElementById('form.button.loading')

	email.disabled = true
	password.disabled = true
	button.disabled = true

	buttonNormal.style.display = 'none'
	buttonLoading.style.display = 'inline'

	firebase.auth().signInWithEmailAndPassword(email.value, password.value)
	.catch(function(error)
	{
		email.disabled = false
		password.disabled = false
		button.disabled = false

		buttonNormal.style.display = 'inline'
		buttonLoading.style.display = 'none'

		console.log("ERROR: " + JSON.stringify(error))
	})
}