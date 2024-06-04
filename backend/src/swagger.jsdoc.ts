import swaggerJsdoc from 'swagger-jsdoc';

import { movie_response } from './Swagger/movie.swagger';
import { returned_rating } from './Swagger/rating.swagger';




const options = {
  swaggerDefinition: {
    components: {

      securitySchemes: {
        myAuth: { // Name for the security scheme
          type: 'http',
          scheme: 'bearer',
        },
      },

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
      { url: 'https://popfix.onrender.com' },
    ],
    paths: {

      '/auth/google/{oauth_access_token}': {
        get: {
          parameters: [
            {
            in: 'path',
            name: "oauth_access_token",
            required: true,
            schema:{
              type: "string"     
            },
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

      
      '/movies/{page}/genres': {
        get: {
          security: [{
            myAuth: []
           }],
          parameters: [
            {
              in: 'path',
              name: "page",
              required: true,
               schema: {
                type: "string"
               },
            },
            {
              in: 'query',
              name: "genre",
              required: true,
              schema: {
                type: "string"
              },
            },
        ],
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
            },
            403: {
              
            }
          }
      }},


      '/movie/{id}': {
        get: {
          security: [{ 
            myAuth: []
           }],
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
            {
            in: 'path',
            name: "id",
            required: true,
            schema:{
              type: "string"     
            },
          }]
      }},

      '/ratings/create/for_movie/{movie_id}': {
        post: {
          security: [{ 
            myAuth: []
           }],
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
          {
            in: 'path',
            name: "movie_id",
            required: true,
            schema:{
              type: "string"     
            },
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

      '/ratings/{movie_id}': {
        get: {
          security: [{ 
            myAuth: []
           }],
          responses:{
            200: {
              content: {
                'application/json': {
                  // schema: returned_rating
                }
              }
            }
          },
          parameters: [
            {
            in: 'path',
            name: "movie_id",
            required: true,
            schema:{
              type: "string"     
            },
          }, 
          {
            in: 'query',
            name: "page",
            required: true,
            schema:{
              type: "string"     
            },
          }],
        }
      },

      '/ratings/update/{id}': {
        put: {
          security: [{ 
            myAuth: []
           }],
          parameters: [
            {
            in: 'path',
            name: "id",
            required: true,
            schema: {
              type: "string"
            }
          }],
        }
      },

      '/ratings/delete/{id}': {
        delete: {
          security: [{ 
            myAuth: []
           }],
          responses: {
            200: {},
            404: {}
          },
          parameters: [
        
            {
            in: 'path',
            name: "id",
            required: true,
            schema: {
              type: "string"
            }
          }],
        }
      },






    }
  },
  apis: ['./Routes/*.route.ts', './main.ts'],
};

const specs = swaggerJsdoc(options);
export { specs }
