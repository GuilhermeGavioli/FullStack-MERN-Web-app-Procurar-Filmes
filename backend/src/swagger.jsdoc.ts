import swaggerJsdoc from 'swagger-jsdoc';
import { Test } from './SwaggerComponents/Test';

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
        }
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
          }]
      }},

      '/movie/{id}': {
        get: {
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
