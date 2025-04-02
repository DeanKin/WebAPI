export const article = {
    "$schema":"http://json-schema.org/draft-04/schema#",
    "id":"/articles",
    "title": "Article",
    "description": "An article in the blog",
    "type": "object",
    "properties": {
        "title": {
            "description": "Main Title of the blog article",
            "type": "string"
        }, 
        "allText": {
            "description": "Article details",
            "type": "string"
        }, 
        "summary": {
            "description": "Summary of the articles",
            "type": "string"
        },
        "imageurl": {
            "description": "URL of the image",
            "type": "uri"
        },
        "published": {
            "description": "Is the article published or not",
            "type": "boolean"
        },
        "authorid": {
            "description": "Author ID",
            "type": "integer",
            "minimum": 0
        }
    },
    "required":["title", "allText", "authorid"]
}