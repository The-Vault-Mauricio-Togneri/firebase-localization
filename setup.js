const readline = require('readline')

const rl = readline.createInterface(
{
	input: process.stdin,
	output: process.stdout
})

rl.question('Project ID: ', value =>
{
	onProjectId(value)

	rl.close()
})

function onProjectId(projectId)
{
	var rc    = firebaserc(projectId)
	var front = frontend(projectId, '123', '456')
	var back  = backend(projectId)

	console.log(back)
}

function firebaserc(projectId)
{
	return `{\n\t"projects": {\n\t\t"default": "${projectId}"\n\t}\n}`
}

function frontend(projectId, apiKey, senderId)
{
	var result = 'const FIREBASE_CONFIG = {\n'
	result += `\tapiKey: '${apiKey}',\n`
	result += `\tauthDomain: '${projectId}.firebaseapp.com',\n`
	result += `\tdatabaseURL: 'https://${projectId}.firebaseio.com',\n`
	result += `\tprojectId: '${projectId}',\n`
	result += `\tstorageBucket: '${projectId}.appspot.com',\n`
	result += `\tmessagingSenderId: '${senderId}'\n`
	result += '}'

	return result
}

function backend(projectId)
{
	return `module.exports = {\n\tdatabaseURL: 'https://${projectId}.firebaseio.com',\n\tstorageBucket: '${projectId}.appspot.com'\n}`
}