/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      d3: 'node_modules/d3',
      'd3-axis': 'node_modules/d3-axis',
      'd3-array': 'node_modules/d3-array',
      'd3-collection': 'node_modules/d3-collection',
      'd3-color': 'node_modules/d3-color',
      'd3-format': 'node_modules/d3-format',
      'd3-interpolate': 'node_modules/d3-interpolate',
      'd3-scale': 'node_modules/d3-scale',
      'd3-time': 'node_modules/d3-time',
      'd3-time-format': 'node_modules/d3-time-format',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',

      // other libraries
      'rxjs':                      'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      rxjs: {
        defaultExtension: 'js'
      },
      'd3': {
        main: 'build/d3.min.js',
        defaultExtension: 'js'
      },
      'd3-array': {
        main: 'build/d3-array.min.js',
        defaultExtension: 'js'
      },
      'd3-axis': {
        main: 'build/d3-axis.min.js',
        defaultExtension: 'js'
      },
      'd3-color': {
        main: 'build/d3-color.min.js',
        defaultExtension: 'js'
      },
      'd3-collection': {
        main: 'build/d3-collection.min.js',
        defaultExtension: 'js'
      },
      'd3-format': {
        main: 'build/d3-format.min.js',
        defaultExtension: 'js'
      },
      'd3-interpolate': {
        main: 'build/d3-interpolate.min.js',
        defaultExtension: 'js'
      },
      'd3-scale': {
        main: 'build/d3-scale.min.js',
        defaultExtension: 'js'
      },
      'd3-time': {
        main: 'build/d3-time.min.js',
        defaultExtension: 'js'
      },
      'd3-time-format': {
        main: 'build/d3-time-format.min.js',
        defaultExtension: 'js'
      }
    }
  });
})(this);
