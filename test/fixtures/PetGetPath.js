module.exports = {
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
        }
    }
};