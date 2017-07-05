"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var build_config_1 = require("./build-config");
var magic_string_1 = require("magic-string");
/** License banner from the build config that will be removed in all source files. */
var licenseBanner = build_config_1.buildConfig.licenseBanner;
/**
 * Rollup plugin that removes all license banners of source files.
 * This is necessary to avoid having the license comment repeated in the output.
 */
exports.rollupRemoveLicensesPlugin = {
    name: 'rollup-clean-duplicate-licenses',
    transform: function (code) {
        var newContent = new magic_string_1.default(code);
        // Walks through every occurrence of a license comment and overwrites it with an empty string.
        for (var pos = -1; (pos = code.indexOf(licenseBanner, pos + 1)) !== -1; null) {
            newContent.overwrite(pos, pos + licenseBanner.length, '');
        }
        return {
            code: newContent.toString(),
            map: newContent.generateMap({ hires: true })
        };
    }
};
