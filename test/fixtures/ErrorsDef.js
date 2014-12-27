module.exports = {
    "Error": {
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