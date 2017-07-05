"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
// There are no type definitions available for these imports.
var uglify = require('uglify-js');
/** Minifies a JavaScript file by using UglifyJS2. Also writes sourcemaps to the output. */
function uglifyJsFile(inputPath, outputPath) {
    var sourcemapOut = outputPath + ".map";
    var result = uglify.minify(inputPath, {
        outSourceMap: sourcemapOut,
        output: {
            comments: 'some'
        }
    });
    fs_1.writeFileSync(outputPath, result.code);
    fs_1.writeFileSync(sourcemapOut, result.map);
}
exports.uglifyJsFile = uglifyJsFile;
