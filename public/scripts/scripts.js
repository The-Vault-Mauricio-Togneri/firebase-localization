function displayContent()
{
	document.getElementById('loading-progress').style.display = 'none'
	document.getElementById('overview-content').style.display = 'block'
}

function downloadFile(path)
{
	var a = document.createElement('A')
	a.href = path
	a.download = path.substr(path.lastIndexOf('/') + 1)
	document.body.appendChild(a)
	a.click()
	document.body.removeChild(a)
}