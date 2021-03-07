const fkill = require('fkill')
const ms = require('ms')
const exists = require('process-exists')

const os = process.platform

var program = "Spotify"

if (os == "win32") program = "Spotify.exe"

var time = process.argv.slice(2).join(" ")
if (!time) return console.error(`Please specify an amount of time for the sleep timer.`)

exists(program)
.then(bool => {
	if(!bool) {
		console.log("Spotify is not open on your system.")
		process.exit(0)
	}
})

console.log(`Sleep timer set to ${ms(ms(time), { long: true}) }\n\n`)

setTimeout(() => {
	console.log("Killing Spotify...")
	killSpotify()
}, ms(time))

async function killSpotify() {
	await fkill(program, { force: true, silent: true })
}