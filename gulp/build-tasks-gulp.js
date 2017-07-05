"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gulp_1 = require("gulp");
var path_1 = require("path");
var tsc_wrapped_1 = require("@angular/tsc-wrapped");
var build_config_1 = require("../build-config");
var build_release_1 = require("../build-release");
var build_bundles_1 = require("../build-bundles");
var inline_resources_1 = require("../inline-resources");
var build_scss_task_1 = require("./build-scss-task");
var sequence_task_1 = require("./sequence-task");
var trigger_livereload_1 = require("./trigger-livereload");
// There are no type definitions available for these imports.
var htmlmin = require('gulp-htmlmin');
var packagesDir = build_config_1.buildConfig.packagesDir, outputDir = build_config_1.buildConfig.outputDir;
var htmlMinifierOptions = {
    collapseWhitespace: true,
    removeComments: true,
    caseSensitive: true,
    removeAttributeQuotes: false
};
/**
 * Creates a set of gulp tasks that can build the specified package.
 * @param packageName Name of the package. Needs to be similar to the directory name in `src/`.
 * @param requiredPackages Required packages that will be built before building the current package.
 */
function createPackageBuildTasks(packageName, requiredPackages) {
    if (requiredPackages === void 0) { requiredPackages = []; }
    // To avoid refactoring of the project the package material will map to the source path `lib/`.
    var packageRoot = path_1.join(packagesDir, packageName === 'material' ? 'lib' : packageName);
    var packageOut = path_1.join(outputDir, 'packages', packageName);
    var tsconfigBuild = path_1.join(packageRoot, 'tsconfig-build.json');
    var tsconfigTests = path_1.join(packageRoot, 'tsconfig-tests.json');
    // Paths to the different output files and directories.
    var esmMainFile = path_1.join(packageOut, 'index.js');
    // Glob that matches all style files that need to be copied to the package output.
    var stylesGlob = path_1.join(packageRoot, '**/*.+(scss|css)');
    // Glob that matches every HTML file in the current package.
    var htmlGlob = path_1.join(packageRoot, '**/*.html');
    // List of watch tasks that need run together with the watch task of the current package.
    var dependentWatchTasks = requiredPackages.map(function (pkgName) { return pkgName + ":watch"; });
    /**
     * Main tasks for the package building. Tasks execute the different sub-tasks in the correct
     * order.
     */
    gulp_1.task(packageName + ":clean-build", sequence_task_1.sequenceTask('clean', packageName + ":build"));
    gulp_1.task(packageName + ":build", sequence_task_1.sequenceTask.apply(void 0, requiredPackages.map(function (pkgName) { return pkgName + ":build"; }).concat([
        // Build ESM and assets output.
        [packageName + ":build:esm", packageName + ":assets"],
        // Inline assets into ESM output.
        packageName + ":assets:inline",
        // Build bundles on top of inlined ESM output.
        packageName + ":build:bundles"])));
    gulp_1.task(packageName + ":build-tests", sequence_task_1.sequenceTask.apply(void 0, requiredPackages.map(function (pkgName) { return pkgName + ":build-tests"; }).concat([
        // Build the ESM output that includes all test files. Also build assets for the package.
        [packageName + ":build:esm:tests", packageName + ":assets"],
        // Inline assets into ESM output.
        packageName + ":assets:inline"])));
    /**
     * Release tasks for the package. Tasks compose the release output for the package.
     */
    gulp_1.task(packageName + ":build-release:clean", sequence_task_1.sequenceTask('clean', packageName + ":build-release"));
    gulp_1.task(packageName + ":build-release", [packageName + ":build"], function () { return build_release_1.composeRelease(packageName); });
    /**
     * TypeScript compilation tasks. Tasks are creating ESM, FESM, UMD bundles for releases.
     */
    gulp_1.task(packageName + ":build:esm", function () { return tsc_wrapped_1.main(tsconfigBuild, { basePath: packageRoot }); });
    gulp_1.task(packageName + ":build:esm:tests", function () { return tsc_wrapped_1.main(tsconfigTests, { basePath: packageRoot }); });
    gulp_1.task(packageName + ":build:bundles", function () { return build_bundles_1.buildPackageBundles(esmMainFile, packageName); });
    /**
     * Asset tasks. Building SASS files and inlining CSS, HTML files into the ESM output.
     */
    gulp_1.task(packageName + ":assets", [
        packageName + ":assets:scss",
        packageName + ":assets:copy-styles",
        packageName + ":assets:html"
    ]);
    gulp_1.task(packageName + ":assets:scss", build_scss_task_1.buildScssTask(packageOut, packageRoot, true));
    gulp_1.task(packageName + ":assets:copy-styles", function () {
        return gulp_1.src(stylesGlob).pipe(gulp_1.dest(packageOut));
    });
    gulp_1.task(packageName + ":assets:html", function () {
        return gulp_1.src(htmlGlob).pipe(htmlmin(htmlMinifierOptions)).pipe(gulp_1.dest(packageOut));
    });
    gulp_1.task(packageName + ":assets:inline", function () { return inline_resources_1.inlineResourcesForDirectory(packageOut); });
    /**
     * Watch tasks, that will rebuild the package whenever TS, SCSS, or HTML files change.
     */
    gulp_1.task(packageName + ":watch", dependentWatchTasks, function () {
        gulp_1.watch(path_1.join(packageRoot, '**/*.+(ts|scss|html)'), [packageName + ":build", trigger_livereload_1.triggerLivereload]);
    });
}
exports.createPackageBuildTasks = createPackageBuildTasks;
