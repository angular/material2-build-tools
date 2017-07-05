"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var gulp_1 = require("gulp");
// This import does not have any type definitions.
var gulpConnect = require('gulp-connect');
/** Triggers a reload when livereload is enabled and a gulp-connect server is running. */
function triggerLivereload() {
    console.log(chalk_1.yellow('Server: Changes were detected and a livereload was triggered.'));
    return gulp_1.src('dist').pipe(gulpConnect.reload());
}
exports.triggerLivereload = triggerLivereload;
