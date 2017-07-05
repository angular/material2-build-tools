"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var fs_1 = require("fs");
/** Name of the build config file. */
var BUILD_CONFIG_FILENAME = 'build-config.js';
/** Method that searches for a build config file that will be used for packaging. */
function findBuildConfig() {
    var currentDir = process.cwd();
    while (!fs_1.existsSync(path_1.resolve(currentDir, BUILD_CONFIG_FILENAME))) {
        var parentDir = path_1.dirname(currentDir);
        if (parentDir === currentDir) {
            return null;
        }
        currentDir = parentDir;
    }
    return path_1.join(currentDir, BUILD_CONFIG_FILENAME);
}
exports.findBuildConfig = findBuildConfig;
