"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var build_config_1 = require("./build-config");
/** Version of the project that will be used to replace the placeholder. */
var projectVersion = build_config_1.buildConfig.projectVersion;
/** Updates the `package.json` file of the specified package. Replaces the version placeholder. */
function updatePackageVersion(packageDir) {
    var packagePath = path_1.join(packageDir, 'package.json');
    var packageConfig = require(packagePath);
    // Replace the `0.0.0-PLACEHOLDER` version name with the version of the root package.json file.
    packageConfig.version = packageConfig.version.replace('0.0.0-PLACEHOLDER', projectVersion);
    fs_1.writeFileSync(packagePath, JSON.stringify(packageConfig, null, 2));
}
exports.updatePackageVersion = updatePackageVersion;
