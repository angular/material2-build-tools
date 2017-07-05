"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var copy_files_1 = require("./copy-files");
var pure_annotations_1 = require("./pure-annotations");
var package_versions_1 = require("./package-versions");
var metadata_inlining_1 = require("./metadata-inlining");
var typings_reexport_1 = require("./typings-reexport");
var metadata_reexport_1 = require("./metadata-reexport");
var build_config_1 = require("./build-config");
var packagesDir = build_config_1.buildConfig.packagesDir, outputDir = build_config_1.buildConfig.outputDir, projectDir = build_config_1.buildConfig.projectDir;
/** Directory where all bundles will be created in. */
var bundlesDir = path_1.join(outputDir, 'bundles');
/**
 * Copies different output files into a folder structure that follows the `angular/angular`
 * release folder structure. The output will also contain a README and the according package.json
 * file. Additionally the package will be Closure Compiler and AOT compatible.
 */
function composeRelease(packageName) {
    // To avoid refactoring of the project the package material will map to the source path `lib/`.
    var sourcePath = path_1.join(packagesDir, packageName === 'material' ? 'lib' : packageName);
    var packagePath = path_1.join(outputDir, 'packages', packageName);
    var releasePath = path_1.join(outputDir, 'releases', packageName);
    metadata_inlining_1.inlinePackageMetadataFiles(packagePath);
    copy_files_1.copyFiles(packagePath, '**/*.+(d.ts|metadata.json)', path_1.join(releasePath, 'typings'));
    copy_files_1.copyFiles(bundlesDir, packageName + ".umd?(.min).js?(.map)", path_1.join(releasePath, 'bundles'));
    copy_files_1.copyFiles(bundlesDir, packageName + "?(.es5).js?(.map)", path_1.join(releasePath, '@angular'));
    copy_files_1.copyFiles(projectDir, 'LICENSE', releasePath);
    copy_files_1.copyFiles(packagesDir, 'README.md', releasePath);
    copy_files_1.copyFiles(sourcePath, 'package.json', releasePath);
    package_versions_1.updatePackageVersion(releasePath);
    typings_reexport_1.createTypingsReexportFile(releasePath, packageName);
    metadata_reexport_1.createMetadataReexportFile(releasePath, packageName);
    pure_annotations_1.addPureAnnotationsToFile(path_1.join(releasePath, '@angular', packageName + ".es5.js"));
}
exports.composeRelease = composeRelease;
