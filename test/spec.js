var assert = require('assert')
var fs     = require('fs')
var pony   = require('./pony.jpg')
var thumb  = require('./thumb.svg')

it('can parse raster images', function() {
    assert(typeof pony == 'string')
    assert(pony.indexOf('base64') >= 0)
})

it('can paser svg images', function() {
    assert(typeof thumb == 'string')
    assert(thumb.indexOf('<svg') >= 0)
})
