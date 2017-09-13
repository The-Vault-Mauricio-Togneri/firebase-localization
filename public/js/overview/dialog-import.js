app.controller(DIALOG_IMPORT, function($scope, ui)
{
	$scope.form = {
		format: '',
		fileName: '',
		fileContent: ''
	}

	$scope.open = function()
	{
		$scope.form.format = ''
		$scope.form.fileName = ''
		$scope.form.fileContent = ''

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

	$scope.onBrowse = function()
	{
		$('#input-browse').click()
	}

	$scope.onImport = function(form)
	{
		// TODO
		
		ui.closeDialog(DIALOG_IMPORT)
	}
})