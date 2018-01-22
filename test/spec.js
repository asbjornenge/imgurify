var assert       = require('assert')
var fs           = require('fs')
var pony         = require('./pony.jpg')
var thumb        = require('./thumb.svg')
var newlines     = require('./newlines.svg')
var singlequotes = require('./singlequotes.svg')
var spinner      = require('./spinner.gif')
var spinnerRaw   = fs.readFileSync('./test/spinner.gif','base64')

it('can parse raster images', function() {
    assert(typeof pony == 'string')
    assert(pony.indexOf('base64') >= 0)
})

it('can parse svg images', function() {
    assert(typeof thumb == 'string')
    assert(typeof newlines == 'string')
    assert(typeof singlequotes == 'string')
    assert(thumb.indexOf('%3Csvg') >= 0)
    assert(newlines.indexOf('%3Csvg') >= 0)
    assert(singlequotes.indexOf('%3Csvg') >= 0)
    assert(newlines.indexOf('\n') < 0)
    assert(newlines.indexOf("'") > 0)
    assert(newlines.indexOf('"') < 0)
    assert(singlequotes.indexOf('\n') < 0)
    assert(singlequotes.indexOf("'") > 0)
    assert(singlequotes.indexOf('"') < 0)
})

it('produces valid base64 encoding for large files also (multiple buffers)', function() {
    assert(spinner.indexOf(spinnerRaw) >= 0)
})

it('adds the correct mimetype', function() {
    assert(pony.indexOf('data:image/jpeg') == 0)
    assert(thumb.indexOf('data:image/svg') == 0)
    assert(newlines.indexOf('data:image/svg') == 0)
    assert(singlequotes.indexOf('data:image/svg') == 0)
    assert(spinner.indexOf('data:image/gif') == 0)
})

it('adds the correct encoding', function() {
    assert(pony.indexOf(';base64,') > 0)
    assert(thumb.indexOf(';charset=utf8,') < 0)
    assert(newlines.indexOf(';charset=utf8,') < 0)
    assert(singlequotes.indexOf(';charset=utf8,') < 0)
    assert(spinner.indexOf(';base64,') > 0)
})
