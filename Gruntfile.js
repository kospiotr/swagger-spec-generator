/*
 * grunt-swagger-spec-generator
 * https://github.com/kospiotr/swagger-spec-generator
 *
 * Copyright (c) 2014 Piotr Kosmowski
 * Licensed under the MIT license.
 */

'use strict';
module.exports = function (grunt) {

// Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['test/tmp']
        },
        // Configuration to be run (and then tested).
        swagger_spec_generator: {
            options: {
                dest: './test/tmp/spec.json'
            },
            default_options: {
            },
            override_options: {
                options: {
                    override: {
                        "info": {
                            "version": "1.0.0",
                            "title": "Swagger Petstore",
                            "description": "A sample API that uses a petstore as an example to demonstrate features in the swagger-2.0 specification",
                            "termsOfService": "http://helloreverb.com/terms/",
                            "contact": {
                                "name": "Wordnik API Team",
                                "email": "foo@example.com",
                                "url": "http://madskristensen.net"
                            },
                            "license": {
                                "name": "MIT",
                                "url": "http://github.com/gruntjs/grunt/blob/master/LICENSE-MIT"
                            }
                        },
                        "host": "petstore.swagger.wordnik.com",
                        "basePath": "/api",
                        "schemes": [
                            "http"
                        ],
                        "consumes": [
                            "application/json"
                        ],
                        "produces": [
                            "application/json"
                        ],
                        "paths": {
                            "/pets": {
                                "get": {
                                    "description": "Returns all pets from the system that the user has access to",
                                    "operationId": "findPets",
                                    "produces": [
                                        "application/json",
                                        "application/xml",
                                        "text/xml",
                                        "text/html"
                                    ],
                                    "parameters": [
                                        {
                                            "name": "tags",
                                            "in": "query",
                                            "description": "tags to filter by",
                                            "required": false,
                                            "type": "array",
                                            "items": {
                                                "type": "string"
                                            },
                                            "collectionFormat": "csv"
                                        },
                                        {
                                            "name": "limit",
                                            "in": "query",
                                            "description": "maximum number of results to return",
                                            "required": false,
                                            "type": "integer",
                                            "format": "int32"
                                        }
                                    ],
                                    "responses": {
                                        "200": {
                                            "description": "pet response",
                                            "schema": {
                                                "type": "array",
                                                "items": {
                                                    "$ref": "#/definitions/pet"
                                                }
                                            }
                                        },
                                        "default": {
                                            "description": "unexpected error",
                                            "schema": {
                                                "$ref": "#/definitions/errorModel"
                                            }
                                        }
                                    }
                                },
                                "post": {
                                    "description": "Creates a new pet in the store.  Duplicates are allowed",
                                    "operationId": "addPet",
                                    "produces": [
                                        "application/json"
                                    ],
                                    "parameters": [
                                        {
                                            "name": "pet",
                                            "in": "body",
                                            "description": "Pet to add to the store",
                                            "required": true,
                                            "schema": {
                                                "$ref": "#/definitions/newPet"
                                            }
                                        }
                                    ],
                                    "responses": {
                                        "200": {
                                            "description": "pet response",
                                            "schema": {
                                                "$ref": "#/definitions/pet"
                                            }
                                        },
                                        "default": {
                                            "description": "unexpected error",
                                            "schema": {
                                                "$ref": "#/definitions/errorModel"
                                            }
                                        }
                                    }
                                }
                            },
                            "/pets/{id}": {
                                "get": {
                                    "description": "Returns a user based on a single ID, if the user does not have access to the pet",
                                    "operationId": "findPetById",
                                    "produces": [
                                        "application/json",
                                        "application/xml",
                                        "text/xml",
                                        "text/html"
                                    ],
                                    "parameters": [
                                        {
                                            "name": "id",
                                            "in": "path",
                                            "description": "ID of pet to fetch",
                                            "required": true,
                                            "type": "integer",
                                            "format": "int64"
                                        }
                                    ],
                                    "responses": {
                                        "200": {
                                            "description": "pet response",
                                            "schema": {
                                                "$ref": "#/definitions/pet"
                                            }
                                        },
                                        "default": {
                                            "description": "unexpected error",
                                            "schema": {
                                                "$ref": "#/definitions/errorModel"
                                            }
                                        }
                                    }
                                },
                                "delete": {
                                    "description": "deletes a single pet based on the ID supplied",
                                    "operationId": "deletePet",
                                    "parameters": [
                                        {
                                            "name": "id",
                                            "in": "path",
                                            "description": "ID of pet to delete",
                                            "required": true,
                                            "type": "integer",
                                            "format": "int64"
                                        }
                                    ],
                                    "responses": {
                                        "204": {
                                            "description": "pet deleted"
                                        },
                                        "default": {
                                            "description": "unexpected error",
                                            "schema": {
                                                "$ref": "#/definitions/errorModel"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "definitions": {
                            "pet": {
                                "required": [
                                    "id",
                                    "name"
                                ],
                                "properties": {
                                    "id": {
                                        "type": "integer",
                                        "format": "int64"
                                    },
                                    "name": {
                                        "type": "string"
                                    },
                                    "tag": {
                                        "type": "string"
                                    }
                                }
                            },
                            "newPet": {
                                "allOf": [
                                    {
                                        "$ref": "pet"
                                    },
                                    {
                                        "required": [
                                            "name"
                                        ],
                                        "properties": {
                                            "id": {
                                                "type": "integer",
                                                "format": "int64"
                                            }
                                        }
                                    }
                                ]
                            },
                            "errorModel": {
                                "required": [
                                    "code",
                                    "message"
                                ],
                                "properties": {
                                    "code": {
                                        "type": "integer",
                                        "format": "int32"
                                    },
                                    "message": {
                                        "type": "string"
                                    }
                                }
                            }
                        }
                    },
                    dest: './test/tmp/override_options.json'
                }
            },
            require_options: {
                options: {
                    definitions: './test/fixtures/**/*Def.js',
                    paths: './test/fixtures/**/*Path.js',
                    dest: './test/tmp/require_options.json'
                    
                }
            },
        },
        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });
// Actually load this plugin's task(s).
    grunt.loadTasks('tasks');
// These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
// Whenever the "test" task is run, first clean the "tmp" dir, then run this
// plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'swagger_spec_generator', 'nodeunit']);
// By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);
};
