app.service('ui', function()
{
	this.showError = function(message)
	{
		controller(DIALOG_MESSAGE).showError(message)
	}

	this.showSuccess = function(message)
	{
		controller(DIALOG_MESSAGE).showSuccess(message)
	}
	
	this.dialog = function(id)
	{
		return $(`[ng-controller=${id}]`)
	}
	
	this.openDialog = function(id)
	{
		this.dialog(id).modal()
	}
	
	this.closeDialog = function(id)
	{
		this.dialog(id).modal('hide')
	}
	
	this.openTab = function(id, index)
	{
		$(`#${id} a:${index}`).tab('show')
	}
	
	this.focus = function(id)
	{
		$(`#${id}`).focus()
	}
})