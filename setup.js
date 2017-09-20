const readline = require('readline')
const files = require('fs')

const reader = readline.createInterface(
{
	input: process.stdin,
	output: process.stdout
})

reader.question('API Key: ', key =>
{
	reader.question('Project ID: ', id =>
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

	files.writeFileSync('.firebaserc', rc)
	files.writeFileSync('./public/js/common/config.js', front)
	files.writeFileSync('./functions/config.js', back)
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