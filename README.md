# imgurify

[Browserify](http://browserify.org/) transform that allows you to require images -> base64\* data uri's.

\* base64 only for raster images, svgs are inlined as svg+xml, because [reasons](https://css-tricks.com/probably-dont-base64-svg/)...

## Install

```bash
npm install --save imgurify
```

## Use

```bash
browserify -t imgurify entry.js
```

```javascript
var pony = require('./graphics/pony.png')
console.log(pony)
// => data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcA...
```

## Changelog

### 1.2.1

* Fixed base64 encoding of large (multibuffer) raster images

### 1.2.0

* Added a cli `imgurify path/to/img.svg > img.js` :heart_eyes:

### 1.1.0

* Support for svg

### 1.0.0

* Initial release :tada:

enjoy.
