/*
 * grunt-swagger-spec-generator
 * https://github.com/kospiotr/swagger-spec-generator
 *
 * Copyright (c) 2014 Piotr Kosmowski
 * Licensed under the MIT license.
 */

var path = require('path');
var fs = require('fs');
var cwd = process.cwd();

var _ = require('lodash-node');

'use strict';

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    function saveFile(content, filePath) {
        grunt.log.debug('Writing file to: %j', filePath);
        grunt.file.write(filePath, content);
    }

    function overrideOptions(out, options) {
        overrideOption(out, options, 'info');
        overrideOption(out, options, 'host');
        overrideOption(out, options, 'basePath');
        overrideOption(out, options, 'schemes');
        overrideOption(out, options, 'paths');
        overrideOption(out, options, 'consumes');
        overrideOption(out, options, 'produces');
        overrideOption(out, options, 'definitions');
    }

    function overrideOption(out, options, section) {
        var outVar = out[section];
        var optionsVar = options[section];
        out[section] = outVar == null ? optionsVar : _.merge(outVar, optionsVar);
    }

    function importSection(section, out, definitionsPaths) {
        var sectionValue = {};
        grunt.log.debug('Merge: ' + _.extend);
//        grunt.log.debug('Importing %s from %j', section, definitionsPaths);
        var files = grunt.file.expand(definitionsPaths);
//        grunt.log.debug('Files %j', files);
        files.forEach(function (elem) {
            var module = readModule(elem);
            grunt.log.debug('Importing %s from file %j', section, elem);
            grunt.log.debug('Module : %o', module);
            grunt.log.debug('Section: %o', _);
            
            sectionValue = _.merge(sectionValue, module);
        });
        out[section] = sectionValue;
    }
    
    function readModule(filePath) {
        var packageJsonPath = path.join(cwd, filePath);
        if (fs.existsSync(packageJsonPath)) {
//            grunt.log.debug('Reading file: %j ', packageJsonPath);
            var packageData = require(packageJsonPath);
//            grunt.log.debug('File read: %j ', packageData);
            return packageData;
        }
        return {};
    }


    grunt.registerMultiTask('swagger_spec_generator', 'Swagger spec generator', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        grunt.log.debug('This %o', this);
        var options = this.options({
            dest: 'spec.json',
        });
        grunt.log.debug('Options: %j', options);
        var out = {
            "swagger": "2.0",
            "info": {
                "version": "1.0.0",
                "title": "Swagger Application",
            },
            paths: {}
        };

        if (options.override)
            overrideOptions(out, options.override);
        if (options.definitions)
            importSection('definitions', out, options.definitions);
        if (options.paths)
            importSection('paths', out, options.paths);



        var outString = JSON.stringify(out, undefined, 2);
        saveFile(outString, options.dest);
        grunt.log.debug('out: %j', outString);
        grunt.log.debug('out: %j', options.dest);
    });

};
