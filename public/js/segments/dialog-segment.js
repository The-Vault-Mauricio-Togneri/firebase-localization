app.controller(DIALOG_SEGMENT, function($scope, ui)
{
	$scope.form = {
		id: '',
		key: '',
		translations: {},
		description: '',
		tags: '',
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
		$scope.form.tags        = ''
		$scope.form.maxLength   = ''
		$scope.form.screenshot  = ''
		$scope.form.isPlural    = false
		$scope.form.isArray     = false

		for (const index in languages)
		{
			$scope.form.translations[index] = {
				value: '',
				validated: false
			}
		}
	
		open()
	}

	$scope.openEdit = function(languages, segment)
	{
		$scope.form.id          = segment.id
		$scope.form.key         = segment.key
		$scope.form.description = segment.description
		$scope.form.tags        = segment.tags
		$scope.form.maxLength   = segment.maxLength
		$scope.form.screenshot  = segment.screenshot
		$scope.form.isPlural    = segment.isPlural
		$scope.form.isArray     = segment.isArray

		for (const index in languages)
		{
			$scope.form.translations[index] = {
				value: segment.translations[index].value,
				validated: segment.translations[index].validated,
				history: segment.translations[index].history,
			}
		}
	
		open()
	}

	$scope.historyEmpty = function(history)
	{
		return !history || (Object.keys(history).length == 0)
	}

	function open()
	{
		ui.dialog(DIALOG_SEGMENT).on('shown.bs.modal', function()
		{
			ui.focus('dialog-segment-key')
		})

		ui.openTab('dialog-segment-tabs', 'first')

		ui.openDialog(DIALOG_SEGMENT)
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