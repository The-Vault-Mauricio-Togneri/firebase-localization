angular.module('translationsApp', []).controller('translationsCtrl', function($scope)
{
	$scope.locales = []
	$scope.translations = []
	
	$scope.init = function()
	{
		localesRef().once('value', snapLocales =>
		{	
			$scope.locales = localesFromSnap(snapLocales)
	
			translationsRef().once('value', snapTranslations =>
			{
				$scope.translations = translationsFromSnap(snapTranslations)
				$scope.$applyAsync()
				displayContent()
			})
		})
	}

	$scope.onTranslationKeyUpdated = function(translation, value)
	{
		onNodeUpdated(translation.key + '/code', value)
	}

	$scope.onTranslationValueUpdated = function(translation, locale, value)
	{
		onNodeUpdated(translation.key + '/locales/' + locale.key + '/value', value)
	}

	$scope.onTranslationValidatedChanged = function(translation, locale)
	{
		translation.locales[locale.key].validated = !translation.locales[locale.key].validated

		onNodeUpdated(translation.key + '/locales/' + locale.key + '/validated', translation.locales[locale.key].validated)
	}

	$scope.openAddTranslationDialog = function()
	{
		byId('translation-dialog-key').value = ''
		byId('translation-dialog-description').value = ''
		byId('translation-dialog-tags').value = ''
		byId('translation-dialog-max-length').value = ''
		byId('translation-dialog-screenshot').value = ''
		byId('translation-dialog-plural').checked = false
		byId('translation-dialog-array').checked = false

		for (var index in $scope.locales)
		{
			var locale = $scope.locales[index]
			byId('translation-dialog-value-' + locale.key).value = ''
		}
	
		$('#translation-dialog').on('shown.bs.modal', function()
		{
			$('#translation-dialog-key').focus()
		})

		$('#translation-dialog').modal()
	}

	$scope.onAddTranslation = function()
	{
		var key = byId('translation-dialog-key').value
		var description = byId('translation-dialog-description').value
		
		var value = {
			code: key,
			description: description,
			locales: []
		}
		
		for (var locale in $scope.locales)
		{
			var entry = $scope.locales[locale]
	
			value.locales[entry.key] = {
				value: '',
				validated: false
			}
		}
	
		translationsRef().push(value)
	}

	$scope.translationValidatedState = function(value)
	{
		return value ? 'translation-checkbox-on' : 'translation-checkbox-off'
	}
	
	function onNodeUpdated(id, value)
	{
		console.log('Update: ' + id + ' => ' + value)

		translationsEntryRef(id).set(value, function(error)
		{
			if (error)
			{
				console.log('Data could not be saved: ' + error)
			}
			else
			{
				console.log('Data saved successfully')
			}
		})
	}

	$scope.init()
})