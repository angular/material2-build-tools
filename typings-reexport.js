"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var build_config_1 = require("./build-config");
var path_1 = require("path");
/** Create a typing file that links to the bundled definitions of NGC. */
function createTypingsReexportFile(outputDir, entryName) {
    fs_1.writeFileSync(path_1.join(outputDir, entryName + ".d.ts"), build_config_1.buildConfig.licenseBanner + '\nexport * from "./typings/index";');
}
exports.createTypingsReexportFile = createTypingsReexportFile;
