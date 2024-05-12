import swaggerJsdoc from 'swagger-jsdoc';

import { movie_response } from './Swagger/movie.swagger';
import { returned_rating } from './Swagger/rating.swagger';


const headerFormat = {
  in: 'header',
  name: 'Authorization',
  required: true,
  scheme: '#/components/schemas/AuthorizationHeader',
  description: 'auth token returned from /auth/google/{oauth_access_token}'
}

const options = {
  swaggerDefinition: {
    components: {
      schemas:{
        Rating:{
          type: "object",
          properties: {
            comment: {
              description: "",
              type: "string"
            }
          },
          required: [
            "comment"
          ]
        },
      },
      AuthorizationHeader: {
        type: "object",
          properties: {
            Authorization: {
              description: "",
              type: "string"
            }
          },
          required: [
            "Authorization"
          ]
      }
    },

    openapi: '3.0.0',
    info: {
      title: 'My API',
      version: '0.1.9',
      description: 'A simple Node.js API',
    },
    servers: [
      { url: 'http://localhost:3001' },
    ],
    paths: {

      '/auth/google/{oauth_access_token}': {
        get: {
          parameters: [
            {
            in: 'path',
            name: "oauth_access_token",
            required: true,
            type: "string",
          }
        ],
        responses:{
          200: {
            content: {
              'application/json': {
                schema: {
                  type: "object",
                  properties: {
                    access_token: {
                      description: "",
                      type: "string"
                    }
                  },
                }
              }
            }
          }
        }
      }},

      '/movies/{page}/{genre}': {
        get: {
          parameters: [
          headerFormat,
          {
            in: 'path',
            name: "genre",
            required: true,
            type: "string",
          },
            {
            in: 'path',
            name: "page",
            required: true,
            type: "number",
          }],
          responses: {
            200: {
              content: {
                'application/json': {
                  schema: {
                    type: "array",
                    items: movie_response
                  }
                }
              }
            }
          }
      }},

      '/movie/{id}': {
        get: {
          responses: {
            200: {
              content: {
                'application/json': {
                  schema: movie_response
                }
              }
            }
          },
          parameters: [
            headerFormat,
            {
            in: 'path',
            name: "id",
            required: true,
            type: "string",
          }]
      }},

      '/ratings/create/for_movie/{movie_id}': {
        post: {
          responses: {
            200: {
              content: {
                'application/json': {
                  schema: {
                    type: "string"
                  }
                }
              }
            }
          },
          parameters: [
            headerFormat,
          {
            in: 'path',
            name: "movie_id",
            required: true,
            type: "string",
          }],
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Rating"
                },
              }
            },
            required: true
          },

        }
      },

      '/ratings/{movie_id}/{page}': {
        get: {
          responses:{
            200: {
              content: {
                'application/json': {
                  schema: returned_rating
                }
              }
            }
          },
          parameters: [
            headerFormat,
            {
            in: 'path',
            name: "movie_id",
            required: true,
            type: "string",
          }, 
          {
            in: 'path',
            name: "page",
            required: true,
            type: "string",
          }],
        }
      },

      '/ratings/update/{id}': {
        put: {
          parameters: [
            headerFormat,
            {
            in: 'path',
            name: "id",
            required: true,
            type: "string",
          }],
        }
      },

      '/ratings/delete/{id}': {
        delete: {
          responses: {
            200: {},
            404: {}
          },
          parameters: [
            headerFormat,
            {
            in: 'path',
            name: "id",
            required: true,
            type: "string",
          }],
        }
      },






    }
  },
  apis: ['./Routes/*.route.ts', './main.ts'],
};

const specs = swaggerJsdoc(options);
export { specs }
