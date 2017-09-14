app.controller(DIALOG_IMPORT, function($scope, $http, ui)
{
	$scope.form = {
		language: '',
		format: '',
		fileName: '',
		fileContent: '',
		replace: true
	}

	$scope.languages = {}

	$scope.open = function(languages)
	{
		$scope.form.language = ''
		$scope.form.format = ''
		$scope.form.fileName = ''
		$scope.form.fileContent = ''
		$scope.form.replace = true

		$scope.languages = languages

		ui.openDialog(DIALOG_IMPORT)
	}

	$scope.onFileSelected = function(event)
	{
		const file = event.files[0]

		$scope.form.fileName = file.name
		$scope.$applyAsync()

		var reader = new FileReader();
		reader.onload = function()
		{
			$scope.form.fileContent = reader.result
		}
		
		reader.readAsText(file);
	}

	$scope.onBrowse = function(target)
	{
		$('#input-browse').click()
		target.blur()
	}

	$scope.onImport = function(form)
	{
		const config = {
			headers : {
				'Content-Type': 'application/json'
			}
		}

		const data = {
			replace: form.replace,
			content: form.fileContent
		}

		$http.put(`/api/export/${form.language}/${form.format}`, data, config)
		.then(function(response)
		{
			console.log(response)
		}, 
		function(response)
		{
			console.log(response)
		})
		
		console.log($scope.form)

		ui.closeDialog(DIALOG_IMPORT)
	}
})