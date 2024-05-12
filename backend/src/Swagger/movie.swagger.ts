export const movie_response = {
    type: "object",
    properties: {
        _id: {
            type: "string",
            description: ""
        },
        title: {
            type: "string",
            description: ""
        },
        cover: {
            type: "string",
            description: ""
        },
        genres: {
            type: "array",
            items: {
                type: "string",
                description: ""
            }
        },
        runTime: {
            type: "integer",
            description: ""
        },
        description: {
            type: "string",
            description: ""
        },
        released: {
            type: "string",
            description: ""
        },
        director:{
            type: "array",
            items:{
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description: ""
                    },
                    picture: {
                        type: "string",
                        description: ""
                    }
                }
            }
        },
        actors:{
            type: "array",
            items:{
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        description: ""
                    },
                    picture: {
                        type: "string",
                        description: ""
                    }
                }
            }
        }
    }
}