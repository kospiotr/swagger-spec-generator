# grunt-swagger-spec-generator

> Swagger spec generator

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-swagger-spec-generator --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-swagger-spec-generator');
```

## The "swagger_spec_generator" task

### Overview
In your project's Gruntfile, add a section named `swagger_spec_generator` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  swagger_spec_generator: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.dest
Type: `String`

Default value: `'spec.json'`

Target spec file.

#### options.paths
Type: `String / Array`

Default value: `null`

File paths to files containing modules which will be included into `paths` section of the specification.
For example: `paths: './test/fixtures/**/*Path.js'`

#### options.definitions
Type: `String / Array`

Default value: `null`

File paths to files containing modules which will be included into `definitions` section of the specification.
For example: `definitions: './test/fixtures/**/*Def.js'

#### options.override
Type: `Object`

Default value: `null`

Any overrides which will be applied after importing sections from file.
For example:

```
override: {
    "host": "petstore.swagger.wordnik.com"
}

```

Available sections to override:

* info
* host
* basePath
* schemes
* paths
* consumes
* produces
* definitions

#### options.space
Type: `Int`

Default value: `2`

Space for pretty format of generated file.

#### options.validate
Type: `Boolean`

Default value: `true`

Should validate specs against schema after generating it.

### Usage Examples

Models are stored in files which ends with `Def`.
Paths / operations are stored in files which ends with `Path`.

`PetDef.js`

```js
module.exports = {
    "Pet": {
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
    }
}
```

`PetPostPath.js`

```js
module.exports = {
    "/pets": {
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
    }
};
```

`Gruntfile.js`

```js
swagger_spec_generator: {
    generate_schema: {
        options: {
            definitions: './src/models/**/*Def.js',
            paths: './src/operations/**/*Path.js',
            dest: './dist/swagger-spec.json'

        }
    }
}
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
