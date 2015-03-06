# imgurify

[Browserify](http://browserify.org/) transform that allows you to require images -> base64 data uri's.

## Install

    npm install --save imgurify

## Use

    browserify -t imgurify entry.js

    var pony = require('./graphics/pony.png')
    console.log(pony)
    // => data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcA...

enjoy.
