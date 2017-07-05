"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var build_config_1 = require("./build-config");
var rollup_remove_licenses_1 = require("./rollup-remove-licenses");
// There are no type definitions available for these imports.
var rollup = require('rollup');
var rollupNodeResolutionPlugin = require('rollup-plugin-node-resolve');
var ROLLUP_GLOBALS = {
    // Import tslib rather than having TypeScript output its helpers multiple times.
    // See https://github.com/Microsoft/tslib
    'tslib': 'tslib',
    // Angular dependencies
    '@angular/animations': 'ng.animations',
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/forms': 'ng.forms',
    '@angular/http': 'ng.http',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
    '@angular/platform-browser/animations': 'ng.platformBrowser.animations',
    // Local Angular packages inside of Material.
    '@angular/material': 'ng.material',
    '@angular/cdk': 'ng.cdk',
    // Rxjs dependencies
    'rxjs/BehaviorSubject': 'Rx',
    'rxjs/Observable': 'Rx',
    'rxjs/Subject': 'Rx',
    'rxjs/Subscription': 'Rx',
    'rxjs/observable/combineLatest': 'Rx.Observable',
    'rxjs/observable/forkJoin': 'Rx.Observable',
    'rxjs/observable/fromEvent': 'Rx.Observable',
    'rxjs/observable/merge': 'Rx.Observable',
    'rxjs/observable/of': 'Rx.Observable',
    'rxjs/observable/throw': 'Rx.Observable',
    'rxjs/operator/auditTime': 'Rx.Observable.prototype',
    'rxjs/operator/catch': 'Rx.Observable.prototype',
    'rxjs/operator/debounceTime': 'Rx.Observable.prototype',
    'rxjs/operator/do': 'Rx.Observable.prototype',
    'rxjs/operator/filter': 'Rx.Observable.prototype',
    'rxjs/operator/finally': 'Rx.Observable.prototype',
    'rxjs/operator/first': 'Rx.Observable.prototype',
    'rxjs/operator/let': 'Rx.Observable.prototype',
    'rxjs/operator/map': 'Rx.Observable.prototype',
    'rxjs/operator/share': 'Rx.Observable.prototype',
    'rxjs/operator/startWith': 'Rx.Observable.prototype',
    'rxjs/operator/switchMap': 'Rx.Observable.prototype',
    'rxjs/operator/takeUntil': 'Rx.Observable.prototype',
    'rxjs/operator/toPromise': 'Rx.Observable.prototype',
};
/** Creates a rollup bundle of a specified JavaScript file.*/
function createRollupBundle(config) {
    var bundleOptions = {
        context: 'this',
        external: Object.keys(ROLLUP_GLOBALS),
        entry: config.entry,
        plugins: [rollup_remove_licenses_1.rollupRemoveLicensesPlugin]
    };
    var writeOptions = {
        // Keep the moduleId empty because we don't want to force developers to a specific moduleId.
        moduleId: '',
        moduleName: config.moduleName || 'ng.material',
        banner: build_config_1.buildConfig.licenseBanner,
        format: config.format,
        dest: config.dest,
        globals: ROLLUP_GLOBALS,
        sourceMap: true
    };
    // When creating a UMD, we want to exclude tslib from the `external` bundle option so that it
    // is inlined into the bundle.
    if (config.format === 'umd') {
        bundleOptions.plugins.push(rollupNodeResolutionPlugin());
        var external_1 = Object.keys(ROLLUP_GLOBALS);
        external_1.splice(external_1.indexOf('tslib'), 1);
        bundleOptions.external = external_1;
    }
    return rollup.rollup(bundleOptions).then(function (bundle) { return bundle.write(writeOptions); });
}
exports.createRollupBundle = createRollupBundle;
