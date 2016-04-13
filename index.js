var fs = require('fs')
var mime = require('mime')
var through = require('through2')
var isImg = function(file) { return (/\.((lit)?gif|png|jpg|jpeg|svg)$/).exec(file) }

module.exports = function(file) {
  if (!isImg(file)) return through()
  var type = mime.lookup(file)
  var enc  = type == 'image/svg+xml' ? 'utf-8' : 'base64'
  var meta = type == 'image/svg+xml' ? ';charset=utf8,' : ';base64,'
  var data = fs.readFileSync(file).toString(enc)
  return through(
    function(buf, enc, cb) { cb() },
    function(end) {
      var mod = "module.exports = 'data:"+type+meta+data+"'"
      this.push(mod)
      end()
    }
  )
}

