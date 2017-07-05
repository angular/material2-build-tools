"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gulp_1 = require("gulp");
var path_1 = require("path");
// These imports lack of type definitions.
var gulpSass = require('gulp-sass');
var gulpIf = require('gulp-if');
var gulpCleanCss = require('gulp-clean-css');
/** Create a gulp task that builds SCSS files. */
function buildScssTask(outputDir, sourceDir, minifyOutput) {
    if (minifyOutput === void 0) { minifyOutput = false; }
    return function () {
        return gulp_1.src(path_1.join(sourceDir, '**/*.scss'))
            .pipe(gulpSass().on('error', gulpSass.logError))
            .pipe(gulpIf(minifyOutput, gulpCleanCss()))
            .pipe(gulp_1.dest(outputDir));
    };
}
exports.buildScssTask = buildScssTask;
