"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var glob_1 = require("glob");
var path_2 = require("path");
/**
 * Recurse through a parsed metadata.json file and inline all html and css.
 * Note: this assumes that all html and css files have a unique name.
 */
function inlineMetadataResources(metadata, componentResources) {
    // Convert `templateUrl` to `template`
    if (metadata.templateUrl) {
        var fullResourcePath = componentResources.get(path_1.basename(metadata.templateUrl));
        metadata.template = fs_1.readFileSync(fullResourcePath, 'utf-8');
        delete metadata.templateUrl;
    }
    // Convert `styleUrls` to `styles`
    if (metadata.styleUrls && metadata.styleUrls.length) {
        metadata.styles = [];
        for (var _i = 0, _a = metadata.styleUrls; _i < _a.length; _i++) {
            var styleUrl = _a[_i];
            var fullResourcePath = componentResources.get(path_1.basename(styleUrl));
            metadata.styles.push(fs_1.readFileSync(fullResourcePath, 'utf-8'));
        }
        delete metadata.styleUrls;
    }
    // We we did nothing at this node, go deeper.
    if (!metadata.template && !metadata.styles) {
        for (var property in metadata) {
            if (typeof metadata[property] == 'object' && metadata[property]) {
                inlineMetadataResources(metadata[property], componentResources);
            }
        }
    }
}
exports.inlineMetadataResources = inlineMetadataResources;
/** Inlines HTML and CSS resources into `metadata.json` files. */
function inlinePackageMetadataFiles(packagePath) {
    // Create a map of fileName -> fullFilePath. This is needed because the templateUrl and
    // styleUrls for each component use just the filename because, in the source, the component
    // and the resources live in the same directory.
    var componentResources = new Map();
    glob_1.sync(path_2.join(packagePath, '**/*.+(html|css)')).forEach(function (resourcePath) {
        componentResources.set(path_1.basename(resourcePath), resourcePath);
    });
    // Find all metadata files. For each one, parse the JSON content, inline the resources, and
    // reserialize and rewrite back to the original location.
    glob_1.sync(path_2.join(packagePath, '**/*.metadata.json')).forEach(function (path) {
        var metadata = JSON.parse(fs_1.readFileSync(path, 'utf-8'));
        inlineMetadataResources(metadata, componentResources);
        fs_1.writeFileSync(path, JSON.stringify(metadata), 'utf-8');
    });
}
exports.inlinePackageMetadataFiles = inlinePackageMetadataFiles;
