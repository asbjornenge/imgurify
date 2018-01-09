var red          = require('../test/red.png')
var pony         = require('../test/pony.jpg')
var logo         = require('../test/javascript-logo.png')
var thumb        = require('../test/thumb.svg')
var newlines     = require('../test/newlines.svg')
var singlequotes = require('../test/singlequotes.svg')
var spinner      = require('../test/spinner.gif')

var container = document.createElement('div')
var _pony = document.createElement('img')
var _logo = document.createElement('img')
var _thumb = document.createElement('img')
var _newlines = document.createElement('img')
var _singlequotes = document.createElement('img')
var _spinner = document.createElement('img')
var _red = document.createElement('img')
_pony.src = pony
_logo.src = logo
_thumb.src = thumb
_newlines.src = newlines
_singlequotes.src = singlequotes
_spinner.src = spinner
_red.src = red
container.appendChild(_pony)
container.appendChild(_logo)
container.appendChild(_spinner)
container.appendChild(_thumb)
container.appendChild(_newlines)
container.appendChild(_singlequotes)
container.appendChild(_red)
document.body.appendChild(container)

