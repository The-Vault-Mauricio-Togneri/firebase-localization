app.controller(DIALOG_IMPORT, function($scope, $http, ui)
{
	$scope.apiToken = ''

	$scope.loading = false

	$scope.form = {
		language: '',
		format: '',
		fileName: '',
		fileContent: '',
		replace: true
	}

	$scope.languages = {}

	$scope.open = function(languages, token)
	{
		$scope.apiToken = token

		$scope.loading = false

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
		$scope.loading = true

		const config = {
			headers : {
				'Content-Type': 'text/plain'
			}
		}

		$http.put(`/api/import/${form.language}/${form.format}?replace=${form.replace}&token=${$scope.apiToken}`, form.fileContent, config)
		.then(function(response)
		{
			ui.showSuccess('Import successful')

			ui.closeDialog(DIALOG_IMPORT)
		}, 
		function(response)
		{
			ui.showError('Error importing file')
			
			$scope.loading = false
		})
	}
})