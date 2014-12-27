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
var ZSchema = require("z-schema");
var _ = require('lodash-node');
var validate = require('json-schema/lib/validate').validate;

'use strict';

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    function saveFile(content, filePath) {
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
        var files = grunt.file.expand(definitionsPaths);
        files.forEach(function (elem) {
            grunt.log.debug('Importing %j from file: %j', section, elem);
            var module = readModule(elem);
            sectionValue = _.merge(sectionValue, module);
        });
        out[section] = sectionValue;
    }

    function readModule(filePath) {
        var packageJsonPath = path.join(cwd, filePath);
        if (fs.existsSync(packageJsonPath)) {
            var packageData = require(packageJsonPath);
            return packageData;
        }
        return {};
    }

    function validateSchema(src) {
        grunt.log.debug('Validating spec against schema');
        var jsonSchema = grunt.file.readJSON('schema');
        var specSchema = grunt.file.readJSON('node_modules/swagger-schema-official/schema.json');
        var spec = grunt.file.readJSON(src);
        var validator = new ZSchema();
        validator.setRemoteReference("http://json-schema.org/draft-04/schema", jsonSchema);
        
        var valid = validator.validate(spec, specSchema);
        grunt.log.debug('Is schema valid: %j', valid);
        var err = validator.getLastErrors();
        _.forEach(err, function (elem) {
            grunt.log.debug('Error: %j', elem);
        });
        
        if(err){
            grunt.fatal('Schema is not valid');
        }
    }

    grunt.registerMultiTask('swagger_spec_generator', 'Swagger spec generator', function () {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            space: 2,
            dest: 'spec.json',
            validate: true
        });
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

        var outString = JSON.stringify(out, undefined, options.space);
        saveFile(outString, options.dest);
        grunt.log.debug('Saving schema to: %j', options.dest);

        if (options.validate)
            validateSchema(options.dest);
    });

};
