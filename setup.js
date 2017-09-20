const readline = require('readline')

const reader = readline.createInterface(
{
	input: process.stdin,
	output: process.stdout
})

reader.question('Project ID: ', id =>
{
	reader.question('API Key: ', key =>
	{
		generateFiles(id, key)
	
		reader.close()
	})
})

function generateFiles(projectId, apiKey)
{
	var rc    = firebaserc(projectId)
	var front = frontend(projectId, apiKey)
	var back  = backend(projectId)

	console.log(rc)
	console.log(front)
	console.log(back)
}

function firebaserc(projectId)
{
	return `{\n\t"projects": {\n\t\t"default": "${projectId}"\n\t}\n}`
}

function frontend(projectId, apiKey)
{
	var result = 'const FIREBASE_CONFIG = {\n'
	result += `\tapiKey: '${apiKey}',\n`
	result += `\tauthDomain: '${projectId}.firebaseapp.com',\n`
	result += `\tdatabaseURL: 'https://${projectId}.firebaseio.com',\n`
	result += `\tprojectId: '${projectId}',\n`
	result += `\tstorageBucket: '${projectId}.appspot.com',\n`
	result += `\tmessagingSenderId: ''\n`
	result += '}'

	return result
}

function backend(projectId)
{
	return `module.exports = {\n\tdatabaseURL: 'https://${projectId}.firebaseio.com',\n\tstorageBucket: '${projectId}.appspot.com'\n}`
}