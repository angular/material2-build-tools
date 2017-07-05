"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var find_build_config_1 = require("./find-build-config");
// Search for a build config by walking up the current working directory of the Node process.
var buildConfigPath = find_build_config_1.findBuildConfig();
if (!buildConfigPath) {
    throw 'Material2 Build tools were not able to find a build config. ' +
        'Please create a "build-config.js" file in your project.';
}
// Load the config file using a basic CommonJS import.
exports.buildConfig = require(buildConfigPath);
