app.controller(DIALOG_LANGUAGE, function($scope, database, ui)
{
	$scope.form = {
		id: '',
		originalCode: '',
		buttonDisabled: true
	}

	$scope.init = function()
	{
		const data = []

		for (const locale in LOCALES)
		{
			data.push({
				id: locale,
				text: LOCALES[locale]
			})
		}

		$scope.select().select2({
			placeholder: 'Language',
			data: data
		})
	}

	$scope.openAdd = function()
	{
		open(null, '')
	}

	$scope.openEdit = function(language)
	{
		open(language.id, language.code)
	}

	function open(id, select)
	{
		$scope.form.id = id
		$scope.form.originalCode = select
		$scope.form.buttonDisabled = true

		$scope.select().val(select).trigger('change.select2')
		ui.openDialog(DIALOG_LANGUAGE)
	}

	$scope.select = function()
	{
		return $('.js-example-placeholder-single')
	}

	$scope.onLanguageSelected = function()
	{
		$scope.form.buttonDisabled = ($scope.select().val() == $scope.form.originalCode)
		$scope.$applyAsync()
	}

	$scope.onAdd = function()
	{
		controller(CONTROLLER_LANGUAGES).addLanguage($scope.select().val())

		ui.closeDialog(DIALOG_LANGUAGE)
	}

	$scope.onEdit = function(form)
	{
		controller(CONTROLLER_LANGUAGES).editLanguage(form.id, $scope.select().val())

		ui.closeDialog(DIALOG_LANGUAGE)
	}

	$scope.init()
})