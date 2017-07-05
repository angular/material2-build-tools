"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var glob_1 = require("glob");
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
/** Function to copy files that match a glob to another directory. */
function copyFiles(fromPath, fileGlob, outDir) {
    glob_1.sync(fileGlob, { cwd: fromPath }).forEach(function (filePath) {
        var fileDestPath = path_1.join(outDir, filePath);
        fs_extra_1.mkdirpSync(path_1.dirname(fileDestPath));
        fs_extra_1.copySync(path_1.join(fromPath, filePath), fileDestPath);
    });
}
exports.copyFiles = copyFiles;
