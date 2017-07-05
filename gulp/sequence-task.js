"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// This import does not have any type definitions.
var gulpRunSequence = require('run-sequence');
/** Create a task that's a sequence of other tasks. */
function sequenceTask() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (done) {
        gulpRunSequence.apply(void 0, args.concat([done]));
    };
}
exports.sequenceTask = sequenceTask;
