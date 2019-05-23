# LAREXjs
Javascript port of the [LAREX](https://github.com/OCR4all/LAREX) library using OpenCV compiled to WebAssembly. This is still at an early stage of development, not feature complete, without user interface, and will probably eat up all your memory because I forgot to clean up some webasm garbage.

You can see it in action over here: [Try it!](https://andbue.github.io/LAREXjs/larex.html).

## Building from source
Compile opencv.js according to the official [tutorial](https://docs.opencv.org/4.1.0/d4/da1/tutorial_js_setup.html) and put it in src/opencv. Install [broserify](http://browserify.org/) (or [watchify](https://github.com/browserify/watchify)) and run:
```
browserify src/main.js > larextest.js
```
