app.controller(DIALOG_SEGMENT, function($scope)
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
		isArray: false,
		formError: false
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
				oldValue: null,
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
				oldValue: segment.translations[index].value,
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
		$scope.form.formError = false
		
		dialog(DIALOG_SEGMENT).on('shown.bs.modal', function()
		{
			focus('dialog-segment-key')
		})

		openTab('dialog-segment-tabs', 'first')

		openDialog(DIALOG_SEGMENT)
	}

	function segmentFormValid(form)
	{
		if (!form.key)
		{
			$scope.form.formError = true
			
			openTab('dialog-segment-tabs', 'first')
			focus('dialog-segment-key')
		}
		else
		{
			return true
		}
	}

	$scope.onAddSegment = function(form)
	{
		if (segmentFormValid(form))
		{
			controller(CONTROLLER_SEGMENTS).addSegment(form)

			closeDialog(DIALOG_SEGMENT)
		}
	}

	$scope.onEditSegment = function(form)
	{
		if (segmentFormValid(form))
		{
			controller(CONTROLLER_SEGMENTS).editSegment(form)

			closeDialog(DIALOG_SEGMENT)
		}
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