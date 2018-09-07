
fs = require 'fs'
path = require 'path'

filesDirectory = process.argv[2]

ps = fs
.readdirSync(filesDirectory)
.map (x) ->
	new Promise (resolve, reject) ->
		fs.readFile (path.join filesDirectory, x), 'utf8', (err, content) ->
			if err?
				reject err
			else
				resolve [x, content]


Promise.all(ps)
.then (result) ->
	data = {}
	result.forEach ([path, content]) ->
		data[path] = content
		fs.writeFileSync 'src/data.json', JSON.stringify(data, null, 2)
.catch (error) ->
	console.log error
