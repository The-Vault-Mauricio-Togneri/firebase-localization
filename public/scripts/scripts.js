function byId(id)
{
	return document.getElementById(id);
}

function createTag(type)
{
	return document.createElement(type);
}

function createText(content)
{
	return document.createTextNode(content);
}

function displayContent()
{
	byId('loading-progress').style.display = 'none'
	byId('overview-content').style.display = 'block'
}

function downloadFile(path)
{
	var a = createTag('A')
	a.href = path
	a.download = path.substr(path.lastIndexOf('/') + 1)
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
}