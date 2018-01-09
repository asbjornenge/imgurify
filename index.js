var fs = require('fs')
var mime = require('mime')
var through = require('through2')
var isImg = function(file) { return (/\.((lit)?gif|png|jpg|jpeg|svg)$/).exec(file) }

function tidySvg(svg) {
  return encodeURIComponent(
      svg.replace(/\n+/g, ' ').trim()  // remove newlines
    ) // encode URL-unsafe characters
    .replace(/%20/g, ' ') // put spaces back in
    .replace(/%3D/g, '=') // ditto equals signs
    .replace(/%3A/g, ':') // ditto colons
    .replace(/%2F/g, '/') // ditto slashes
    .replace(/%22/g, "'") // replace quotes with apostrophes (may break certain SVGs)
}

module.exports = function(file) {
  if (!isImg(file)) return through()
  var type = mime.lookup(file)
  var isSVG = type == 'image/svg+xml'
  var enc  = isSVG ? 'utf-8' : 'base64'
  var meta = isSVG ? ',' : ';base64,'
  var data = fs.readFileSync(file).toString(enc)
  if (isSVG) {
    data = tidySvg(data)
  }
  return through(
    function(buf, enc, cb) { cb() },
    function(end) {
      var mod = 'module.exports = "data:'+type+meta+data+'"'
      this.push(mod)
      end()
    }
  )
}

