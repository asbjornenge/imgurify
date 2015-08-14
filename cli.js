#!/usr/bin/env node
var fs = require('fs')
var args = require('minimist')(process.argv.slice(2), {
    default : {
    }
})
var imgurify = require('./index')

if (args.h || args.help) return console.log('Usage: imgurify path/to/img.png > img.js')
if (args._.length == 0) return console.log('No file argument passed')

var filename = args._[0]
var stream   = imgurify(filename)
fs.createReadStream(filename).pipe(stream).pipe(process.stdout)
