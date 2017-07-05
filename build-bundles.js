"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var typescript_1 = require("typescript");
var minify_sources_1 = require("./minify-sources");
var rollup_helpers_1 = require("./rollup-helpers");
var sourcemap_remap_1 = require("./sourcemap-remap");
var typescript_transpile_1 = require("./typescript-transpile");
var build_config_1 = require("./build-config");
// There are no type definitions available for these imports.
var uglify = require('uglify-js');
var sorcery = require('sorcery');
/** Directory where all bundles will be created in. */
var bundlesDir = path_1.join(build_config_1.buildConfig.outputDir, 'bundles');
/** Builds the bundles for the specified package. */
function buildPackageBundles(entryFile, packageName) {
    return __awaiter(this, void 0, void 0, function () {
        var moduleName, fesm2015File, fesm2014File, umdFile, umdMinFile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    moduleName = "ng." + packageName;
                    fesm2015File = path_1.join(bundlesDir, packageName + ".js");
                    fesm2014File = path_1.join(bundlesDir, packageName + ".es5.js");
                    umdFile = path_1.join(bundlesDir, packageName + ".umd.js");
                    umdMinFile = path_1.join(bundlesDir, packageName + ".umd.min.js");
                    // Build FESM-2015 bundle file.
                    return [4 /*yield*/, rollup_helpers_1.createRollupBundle({
                            moduleName: moduleName,
                            entry: entryFile,
                            dest: fesm2015File,
                            format: 'es',
                        })];
                case 1:
                    // Build FESM-2015 bundle file.
                    _a.sent();
                    return [4 /*yield*/, sourcemap_remap_1.remapSourcemap(fesm2015File)];
                case 2:
                    _a.sent();
                    // Downlevel FESM-2015 file to ES5.
                    typescript_transpile_1.transpileFile(fesm2015File, fesm2014File, {
                        importHelpers: true,
                        target: typescript_1.ScriptTarget.ES5,
                        module: typescript_1.ModuleKind.ES2015,
                        allowJs: true,
                        newLine: typescript_1.NewLineKind.LineFeed
                    });
                    return [4 /*yield*/, sourcemap_remap_1.remapSourcemap(fesm2014File)];
                case 3:
                    _a.sent();
                    // Create UMD bundle of FESM-2014 output.
                    return [4 /*yield*/, rollup_helpers_1.createRollupBundle({
                            moduleName: moduleName,
                            entry: fesm2014File,
                            dest: umdFile,
                            format: 'umd'
                        })];
                case 4:
                    // Create UMD bundle of FESM-2014 output.
                    _a.sent();
                    return [4 /*yield*/, sourcemap_remap_1.remapSourcemap(umdFile)];
                case 5:
                    _a.sent();
                    // Create a minified UMD bundle using UglifyJS
                    minify_sources_1.uglifyJsFile(umdFile, umdMinFile);
                    return [4 /*yield*/, sourcemap_remap_1.remapSourcemap(umdMinFile)];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.buildPackageBundles = buildPackageBundles;
