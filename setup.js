const readline = require('readline')

const rl = readline.createInterface(
{
	input: process.stdin,
	output: process.stdout
})

rl.question('Project ID: ', answer =>
{
	console.log(`Project ID: ${answer}`)

	rl.close()
})