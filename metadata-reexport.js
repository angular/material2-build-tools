"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
/** Creates a metadata file that re-exports the metadata bundle inside of the typings. */
function createMetadataReexportFile(packageDir, packageName) {
    var metadataReExport = "{\n    \"__symbolic\":\"module\",\n    \"version\":3,\"metadata\":{},\n    \"exports\":[{\"from\":\"./typings/index\"}],\n    \"flatModuleIndexRedirect\": true\n  }";
    fs_1.writeFileSync(path_1.join(packageDir, packageName + ".metadata.json"), metadataReExport, 'utf-8');
}
exports.createMetadataReexportFile = createMetadataReexportFile;
