var through = require('through2');
var i       = -1
var head    = function(type) { i++; return i == 0 ? 'module.exports = "data:image/'+type+';base64,' : '' }
var tail    = function()     { return '"' }
var isImg   = function(file) {
    return (/\.((lit)?gif|png|jpg|jpeg)$/).exec(file);
}

module.exports = function (file) {
    if (!isImg(file)) return through()
    var type = isImg(file)[1]
    return through(
        function (buf, enc, next) { this.push(head(type)); this.push(buf.toString('base64')); next() },
        function (end) { this.push(tail()); end() }
    )
}
