app.controller(DIALOG_SEGMENT, function($scope, ui)
{
	$scope.form = {
		id: '',
		key: '',
		translations: {},
		description: '',
		tags: [],
		newTag: '',
		maxLength: '',
		screenshot: '',
		isPlural: false,
		isArray: false
	}

	$scope.openAdd = function(languages)
	{
		$scope.form.id          = ''
		$scope.form.key         = ''
		$scope.form.description = ''
		$scope.form.tags        = []
		$scope.form.newTag      = ''
		$scope.form.maxLength   = ''
		$scope.form.screenshot  = ''
		$scope.form.isPlural    = false
		$scope.form.isArray     = false

		languages.forEach(language =>
		{
			$scope.form.translations[language.id] = {
				value: '',
				validated: false
			}
		})
	
		open()
	}

	$scope.openEdit = function(languages, segment)
	{
		$scope.form.id          = segment.id
		$scope.form.key         = segment.key
		$scope.form.description = segment.description
		$scope.form.tags        = segment.tags
		$scope.form.newTag      = ''
		$scope.form.maxLength   = segment.maxLength
		$scope.form.screenshot  = segment.screenshot
		$scope.form.isPlural    = segment.isPlural
		$scope.form.isArray     = segment.isArray

		languages.forEach(language =>
		{
			const index = language.id

			$scope.form.translations[index] = {
				id: segment.translations[index].id,
				value: segment.translations[index].value,
				validated: segment.translations[index].validated,
				history: segment.translations[index].history,
				comments: segment.translations[index].comments
			}
		})
	
		open()
	}

	$scope.addTag = function(value)
	{
		if ($scope.form.tags.indexOf(value) == -1)
		{  
			$scope.form.tags.push(value)
		}

		$scope.form.newTag = ''
	}

	$scope.removeTag = function(tag)
	{
		const index = $scope.form.tags.indexOf(tag)

		if (index != -1)
		{
			$scope.form.tags.splice(index, 1)
		}
	}

	$scope.historyEmpty = function(history)
	{
		return !history || (Object.keys(history).length == 0)
	}

	function open()
	{
		ui.dialog(DIALOG_SEGMENT).on('shown.bs.modal', () =>
		{
			ui.focus('dialog-segment-key')
		})

		ui.openTab('dialog-segment-tabs', 'first')

		ui.openDialog(DIALOG_SEGMENT)
	}

	$scope.openScreenshot = function(url)
	{
		window.open(url, '_blank')
	}

	$scope.onAddSegment = function(form)
	{
		controller(CONTROLLER_SEGMENTS).addSegment(form)

		ui.closeDialog(DIALOG_SEGMENT)
	}

	$scope.onEditSegment = function(form)
	{
		controller(CONTROLLER_SEGMENTS).editSegment(form)

		ui.closeDialog(DIALOG_SEGMENT)
	}

	$scope.openSegmentHistory = function(history)
	{
		controller(DIALOG_TRANSLATION_HISTORY).open(history)
	}

	$scope.openSegmentComments = function(languageId, comments)
	{
		controller(DIALOG_TRANSLATION_COMMENTS).open($scope.form.id, languageId, comments)
	}
})