var assert  = require('assert')
var fs      = require('fs')
var pony    = require('./pony.jpg')
var thumb   = require('./thumb.svg')
var spinner = require('./spinner.gif')
var spinnerRaw = fs.readFileSync('./test/spinner.gif','base64') 

it('can parse raster images', function() {
    assert(typeof pony == 'string')
    assert(pony.indexOf('base64') >= 0)
})

it('can paser svg images', function() {
    assert(typeof thumb == 'string')
    assert(thumb.indexOf('<svg') >= 0)
})

it('produces valid base64 encoding for large files also (multiple buffers)', function() {
    assert(spinner.indexOf(spinnerRaw) >= 0)
})
