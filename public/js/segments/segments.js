app.controller(CONTROLLER_SEGMENTS, function($scope, database, databaseLanguage, databaseSegment, databaseTranslation, ui)
{
	$scope.languages = {}

	$scope.segments = {}

	$scope.loading = true

	$scope.filter = {
		content: {
			value: '',
			regex: false
		},
		language: {},
		state: {
			translated: true,
			notTranslated: true,
			validated: true,
			notValidated: true
		}
	}

	$scope.order = 'az'
	
	$scope.init = function()
	{
		databaseLanguage.rootStatic(languages =>
		{	
			$scope.languages = languages

			for (const index in $scope.languages)
			{
				$scope.filter.language[index] = true
			}

			databaseSegment.rootStatic(segments =>
			{
				$scope.segments = segments

				for (const index in $scope.segments)
				{
					const segment = $scope.segments[index]

					listenSegmentChanges(segment.id)
				}

				$scope.loading = false

				$scope.orderSegments()
				$scope.$applyAsync()
			})
		})

		$('#collapse-filter').on('shown.bs.collapse', () =>
		{
			ui.focus('filter-content-input')
		})
	}

	$scope.onSegmentKeyUpdated = function(segment, input)
	{
		const oldValue = input.alt
		
		if (oldValue != segment.key)
		{
			if (segment.key)
			{
				input.alt = segment.key
				databaseSegment.updateKey(segment.id, segment.key)
				$scope.orderSegments()
			}
			else
			{
				segment.key = oldValue

				ui.showError('Keys cannot be empty')
			}
		}
	}

	$scope.onTranslationValueUpdated = function(segment, language, textarea)
	{
		const newValue = segment.translations[language.id].value
		const oldValue = textarea.title

		if (newValue != oldValue)
		{
			textarea.title = newValue
			databaseTranslation.updateValue(segment.id, language.id, newValue)
		}
	}

	$scope.onSegmentValidatedChanged = function(segment, language)
	{
		const newValue = !segment.translations[language.id].validated

		segment.translations[language.id].validated = newValue
		databaseTranslation.updateValidated(segment.id, language.id, newValue)
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

		const ref = databaseSegment.add(entry)
		const segment = new Segment(ref.key, entry)

		$scope.segments.push(segment)
		listenSegmentChanges(segment.id)

		$scope.orderSegments()
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
			isArray: form.isArray
		}

		$scope.orderSegments()
		databaseSegment.update(form.id, entry)

		for (const index in form.translations)
		{
			const translation = form.translations[index]

			const translationEntry = {
				value: translation.value,
				validated: translation.validated
			}

			databaseTranslation.update(form.id, translation.id, translationEntry)
		}
	}

	$scope.openDeleteSegmentDialog = function(segment)
	{
		controller(DIALOG_DELETE_SEGMENT).open(segment)
	}

	$scope.deleteSegment = function(id)
	{
		const index = segmentIndexById(id)

		if (index)
		{
			$scope.segments.splice(index, 1)
			
			$scope.orderSegments()
			databaseSegment.remove(id)

			ui.closeDialog(DIALOG_SEGMENT)
		}
	}

	$scope.createNewComment = function(segmentId, languageId, comment)
	{
		databaseTranslation.addComment(segmentId, languageId, comment)
	}

	$scope.onFilterChange = function()
	{
		$scope.$applyAsync()
	}
	
	$scope.displayByState = function(segment)
	{
		const translated = ($scope.filter.state.translated ? segment.hasTranslated() : false)
		const notTranslated = ($scope.filter.state.notTranslated ? segment.hasNotTranslated() : false)
		const validated = ($scope.filter.state.validated ? segment.hasValidated() : false)
		const notValidated = ($scope.filter.state.notValidated ? segment.hasNotValidated() : false)
		const byText = ($scope.filter.content.value ? segment.contains($scope.filter.content.value, $scope.filter.content.regex) : true)

		return (translated || notTranslated || validated || notValidated) && byText
	}

	$scope.openScreenshot = function(url)
	{
		window.open(url, '_blank')
	}

	function segmentById(id)
	{
		const index = segmentIndexById(id)

		return (index) ? $scope.segments[index] : null
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

		return null
	}

	$scope.orderSegments = function()
	{
		if ($scope.order == 'az')
		{
			$scope.segments = $scope.segments.sort(function(a, b)
			{
				return (a.key < b.key) ? -1 : (a.key > b.key)
			})
		}
		else if ($scope.order == 'za')
		{
			$scope.segments = $scope.segments.sort(function(a, b)
			{
				return (a.key > b.key) ? -1 : (a.key < b.key)
			})
		}
		else if ($scope.order == 'newOld')
		{
			$scope.segments = $scope.segments.sort(function(a, b)
			{
				return (a.created > b.created) ? -1 : (a.created < b.created)
			})
		}
		else if ($scope.order == 'oldNew')
		{
			$scope.segments = $scope.segments.sort(function(a, b)
			{
				return (a.created < b.created) ? -1 : (a.created > b.created)
			})
		}
	}

	function listenSegmentChanges(segmentId)
	{
		databaseSegment.refLive(segmentId, segmentSnap =>
		{
			const segmentIndex = segmentIndexById(segmentId)
			
			if (segmentIndex)
			{
				const data = segmentSnap.val()

				if (data)
				{
					const updatedSegment = new Segment(segmentSnap.key, data)
					$scope.segments[segmentIndex].update(updatedSegment)

					$scope.orderSegments()
					$scope.$applyAsync()
				}
			}
		})
	}

	$scope.init()
})