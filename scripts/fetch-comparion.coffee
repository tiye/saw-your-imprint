
fs = require 'fs'
path = require 'path'
cp = require 'child_process'

filesDirectory = process.argv[2]

filenames = cp
.execSync("find #{filesDirectory}").toString()
.trim()
.split '\n'
.filter (x) -> (x.match /\d\d\/\d\d\/\d\d/)?
.map (x) -> x.replace(filesDirectory, '')[1..8].replace(/\//g, '-')
.map (x) -> "20#{x}"
.sort (x, y) -> if x < y then 1 else -1

fs.writeFileSync 'src/comparison.ts', "export default #{JSON.stringify(filenames, null, 2)}"
