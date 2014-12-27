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