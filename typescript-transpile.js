"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts = require("typescript");
var path = require("path");
var fs = require("fs");
var chalk = require("chalk");
/** Reads a input file and transpiles it into a new file. */
function transpileFile(inputPath, outputPath, options) {
    var inputFile = fs.readFileSync(inputPath, 'utf-8');
    var transpiled = ts.transpileModule(inputFile, { compilerOptions: options });
    if (transpiled.diagnostics) {
        reportDiagnostics(transpiled.diagnostics);
    }
    fs.writeFileSync(outputPath, transpiled.outputText);
    if (transpiled.sourceMapText) {
        fs.writeFileSync(outputPath + ".map", transpiled.sourceMapText);
    }
}
exports.transpileFile = transpileFile;
/** Formats the TypeScript diagnostics into a error string. */
function formatDiagnostics(diagnostics, baseDir) {
    if (baseDir === void 0) { baseDir = ''; }
    return diagnostics.map(function (diagnostic) {
        var res = "\u2022 " + chalk.red("TS" + diagnostic.code) + " - ";
        if (diagnostic.file) {
            var _a = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start), line = _a.line, character = _a.character;
            var filePath = path.relative(baseDir, diagnostic.file.fileName);
            res += filePath + "(" + (line + 1) + "," + (character + 1) + "): ";
        }
        res += "" + ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
        return res;
    }).join('\n');
}
/** Checks and reports diagnostics if present. */
function reportDiagnostics(diagnostics, baseDir) {
    if (diagnostics && diagnostics.length && diagnostics[0]) {
        console.error(formatDiagnostics(diagnostics, baseDir));
        throw new Error('TypeScript compilation failed.');
    }
}
