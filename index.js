var through    = require('through2')
var fs         = require('fs')
var svgo_      = require('svgo')
var svgo       = new svgo_()
var rasterHead = function(i,type) { return i == 0 ? 'module.exports = "data:image/'+type+';base64,' : '' }
var svgHead    = function()       { return "module.exports = 'data:image/svg+xml;utf8," }
var rasterTail = function()       { return '"' }
var svgTail    = function()       { return "'" }
var isImg      = function(file)   {
    return (/\.((lit)?gif|png|jpg|jpeg|svg)$/).exec(file);
}

function rasterStream(file, type) {
    var i = -1
    return through(
        function (buf, enc, next) { i++; this.push(rasterHead(i,type)); this.push(buf.toString('base64')); next() },
        function (end) { this.push(rasterTail()); end() }
    )
}

// TODO: I know this is really silly, reading it twice,
// but I couldn't for the life of me figure out how to read and replace all the data
// on the end function ... please make ISSUE or PR on github if you know!
function svgStream(file) {
    var i = -1
    var raw = fs.readFileSync(file,'utf-8')
    return through(
        function (buf, enc, next) { next() },
        function (end) { svgo.optimize(raw, function(res) { this.push(svgHead()); this.push(res.data); this.push(svgTail()); end() }.bind(this)) }
    )
}

module.exports = function (file) {
    if (!isImg(file)) return through()
    var type = isImg(file)[1]
    if (type == 'svg') return svgStream(file)
    else return rasterStream(file, type)
}
