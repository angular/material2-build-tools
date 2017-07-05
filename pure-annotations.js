"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
/** Regex that matches downleveled class IIFE expressions. Used to add the pure annotations. */
var classIfeeRegex = new RegExp('^(var (\\S+) = )(\\(function \\(\\) \\{[\\n\\r]*(?:    (?:\\/\\*\\*| \\*|\\*\\/|' +
    '\\/\\/)[^\\n\\r]*[\\n\\r]*)*    function \\2\\([^\\)]*\\) \\{[\\n\\r]*)', 'mg');
/** Regex that matches downleveled class IIFE expressions with _extends statements */
var classExtendsIfeeRegex = /^(var (\S+) = )(\(function \(_super\) {[\n\r]*    tslib.*\.__extends\(\2, _super\);[\n\r]*)/gm;
/**
 * Adds `@__PURE__` annotation comments to IIFEs containing ES5-downleveled classes generated by
 * TypeScript so that Uglify can tree-shake classes that are not referenced.
 *
 * @param fileContent The content of the file for which `@__PURE__` will be added.
 * @returns The content of the file with `@__PURE__` annotations added.
 */
function addPureAnnotations(fileContent) {
    return fileContent
        .replace(classIfeeRegex, '$1/*@__PURE__*/$3')
        .replace(classExtendsIfeeRegex, '$1/*@__PURE__*/$3');
}
exports.addPureAnnotations = addPureAnnotations;
/** Adds Uglify "@__PURE__" decorations to the specified file. */
function addPureAnnotationsToFile(inputFile) {
    var originalContent = fs_1.readFileSync(inputFile, 'utf-8');
    var annotatedContent = addPureAnnotations(originalContent);
    fs_1.writeFileSync(inputFile, annotatedContent, 'utf-8');
}
exports.addPureAnnotationsToFile = addPureAnnotationsToFile;