app.controller('dialogSegment', function($scope)
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
		
		$('#dialog-segment').on('shown.bs.modal', function()
		{
			$('#dialog-segment-key').focus()
		})

		$('#dialog-segment-tabs a:first').tab('show')

		$('#dialog-segment').on('shown.bs.tab', function(event)
		{
			if (event.target.href.includes('#dialog-segment-tab-segments'))
			{
				$('#dialog-segment-key').focus()
			}
			else if (event.target.href.includes('#dialog-segment-tab-properties'))
			{
				$('#dialog-segment-description').focus()
			}
		})

		openDialog('dialog-segment')
	}

	function segmentFormValid(form)
	{
		if (!form.key)
		{
			$scope.form.formError = true
			$('#dialog-segment-tabs a:first').tab('show')
			$('#dialog-segment-key').focus()
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
			controllerById('segments-controller').addSegment(form)

			closeDialog('dialog-segment')
		}
	}

	$scope.onEditSegment = function(form)
	{
		if (segmentFormValid(form))
		{
			controllerById('segments-controller').editSegment(form)

			closeDialog('dialog-segment')
		}
	}

	$scope.openSegmentHistory = function(history)
	{
		controllerById('dialog-translation-history').open(history)
	}

	$scope.openSegmentComments = function(languageId, comments)
	{
		controllerById('dialog-translation-comments').open($scope.form.id, languageId, comments)
	}
})