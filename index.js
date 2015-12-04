var through    = require('through2')
var esc        = require('js-string-escape')
var rasterHead = function(i,type) { return i == 0 ? 'module.exports = "data:image/'+type+';base64,' : '' }
var svgHead    = function(i,type) { return i == 0 ? "module.exports = 'data:image/svg+xml;utf8," : '' }
var rasterTail = function()       { return '"' }
var svgTail    = function()       { return "'" }
var isImg      = function(file)   {
    return (/\.((lit)?gif|png|jpg|jpeg|svg)$/).exec(file);
}

function rasterStream(file, type) {
    var i = -1
    var tmpbuf = new Buffer('')
    return through(
        function (buf, enc, next) { i++; this.push(rasterHead(i,type)); tmpbuf = Buffer.concat([tmpbuf, buf]); next() },
        function (end) { this.push(tmpbuf.toString('base64')); this.push(rasterTail()); end() }
    )
}

function svgStream(file, type) {
    var i = -1
    return through(
        function (buf, enc, next) { i++; this.push(svgHead(i,type)); this.push(esc(buf.toString('utf-8'))); next() },
        function (end) { this.push(svgTail()); end() }
    )
}

module.exports = function (file) {
    if (!isImg(file)) return through()
    var type = isImg(file)[1]
    if (type == 'svg') return svgStream(file, type)
    else return rasterStream(file, type)
}
