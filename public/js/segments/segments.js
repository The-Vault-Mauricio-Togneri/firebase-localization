app.controller(CONTROLLER_SEGMENTS, function($scope, database, databaseLanguage, databaseSegment, databaseTranslation, ui)
{
	$scope.languages = {}

	$scope.segments = {}

	$scope.loading = true

	$scope.filter = {
		content: '',
		language: {},
		state: {
			translated: true,
			notTranslated: true,
			validated: true,
			notValidated: true
		}
	}
	
	$scope.init = function()
	{
		databaseLanguage.ref().once('value', snapLanguages =>
		{	
			$scope.languages = databaseLanguage.fromSnap(snapLanguages)

			for (const index in $scope.languages)
			{
				$scope.filter.language[index] = true
			}

			databaseSegment.ref().once('value', snapSegments =>
			{
				$scope.segments = databaseSegment.fromSnap(snapSegments)
				orderSegments()
				$scope.loading = false
				$scope.$applyAsync()
			})
		})

		$('#collapse-filter').on('shown.bs.collapse', function()
		{
			ui.focus('filter-content-input')
		})
	}

	$scope.onSegmentKeyUpdated = function(segment)
	{
		databaseSegment.updateSegmentKey(segment.id, segment.key)

		orderSegments()
	}

	$scope.onTranslationValueUpdated = function(segment, language)
	{
		const newValue = segment.translations[language.id].value
		const oldValue = segment.translations[language.id].oldValue

		if (newValue != oldValue)
		{
			databaseTranslation.updateTranslationValue(segment.id, language.id, newValue)
			segment.translations[language.id].oldValue = newValue

			if (segment.translations[language.id].validated)
			{
				updateTranslationValidated(segment, language, false)
			}
		}
	}

	$scope.onSegmentValidatedChanged = function(segment, language)
	{
		updateTranslationValidated(segment, language, !segment.translations[language.id].validated)
	}

	function updateTranslationValidated(segment, language, value)
	{
		segment.translations[language.id].validated = value
		databaseTranslation.updateTranslationValidated(segment.id, language.id, value)
	}

	$scope.openAddSegmentDialog = function()
	{
		controller(DIALOG_SEGMENT).openAdd($scope.languages)
	}

	$scope.addSegment = function(form)
	{
		const entry = {
			key: form.key,
			description: form.description,
			tags: form.tags,
			maxLength: form.maxLength,
			screenshot: form.screenshot,
			isPlural: form.isPlural,
			isArray: form.isArray,
			translations: form.translations
		}

		const ref = databaseSegment.addSegment(entry)
		const segment = new Segment(ref.key, entry)

		$scope.segments.push(segment)
		orderSegments()
	}

	$scope.openEditSegmentDialog = function(segment)
	{
		controller(DIALOG_SEGMENT).openEdit($scope.languages, segment)
	}

	$scope.editSegment = function(form)
	{
		const entry = {
			key: form.key,
			description: form.description,
			tags: form.tags,
			maxLength: form.maxLength,
			screenshot: form.screenshot,
			isPlural: form.isPlural,
			isArray: form.isArray,
			translations: {}
		}

		const sourceSegment = segmentById(form.id)
		sourceSegment.key         = form.key
		sourceSegment.description = form.description
		sourceSegment.tags        = form.tags
		sourceSegment.maxLength   = form.maxLength
		sourceSegment.screenshot  = form.screenshot
		sourceSegment.isPlural    = form.isPlural
		sourceSegment.isArray     = form.isArray

		for (const index in form.translations)
		{
			const language = form.translations[index]

			entry.translations[index] = {
				value: language.value,
				validated: language.validated && (language.value == language.oldValue)
			}

			sourceSegment.translations[index].value     = entry.translations[index].value
			sourceSegment.translations[index].validated = entry.translations[index].validated
		}
		
		orderSegments()
		databaseSegment.updateSegment(form.id, entry)
	}

	$scope.openDeleteSegmentDialog = function(segment)
	{
		controller(DIALOG_DELETE_SEGMENT).open(segment)
	}

	$scope.deleteSegment = function(id)
	{
		const index = segmentIndexById(id)
		$scope.segments.splice(index, 1)
		
		orderSegments()
		databaseSegment.removeSegment(id)

		ui.closeDialog(DIALOG_SEGMENT)
	}

	$scope.createNewComment = function(segmentId, languageId, comment)
	{
		const segment = segmentById(segmentId)
		const language = segment.translationById(languageId)
		//console.log(language)
		//language.comments.push(comment)
	}

	$scope.segmentValidatedState = function(value)
	{
		return value ? 'segment-checkbox-on' : 'segment-checkbox-off'
	}
	
	$scope.displayByState = function(segment)
	{
		const translated = ($scope.filter.state.translated ? segment.hasTranslated() : false)
		const notTranslated = ($scope.filter.state.notTranslated ? segment.hasNotTranslated() : false)
		const validated = ($scope.filter.state.validated ? segment.hasValidated() : false)
		const notValidated = ($scope.filter.state.notValidated ? segment.hasNotValidated() : false)
		const byText = ($scope.filter.content ? segment.contains($scope.filter.content.toLowerCase()) : true)

		return (translated || notTranslated || validated || notValidated) && byText
	}

	function segmentById(id)
	{
		const index = segmentIndexById(id)

		return (index != -1) ? $scope.segments[index] : null
	}

	function segmentIndexById(id)
	{
		for (const index in $scope.segments)
		{
			if ($scope.segments[index].id == id)
			{
				return index
			}
		}

		return -1
	}

	function orderSegments()
	{
		$scope.segments = $scope.segments.sort(function(a, b)
		{
			return (a.key < b.key) ? -1 : (a.key > b.key)
		})
	}

	$scope.init()
})