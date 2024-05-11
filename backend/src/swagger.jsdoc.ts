import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    info: {
      title: 'My API',
      version: '1.0.0',
      description: 'A simple Node.js API',
    },
    servers: [
      { url: 'http://localhost:3001' }, // Adjust the URL based on your deployment
    ],
    paths: {
      '/auth/google/{oauth_access_token}': {
        get: {
          summary: 'Returns a list of users',
          description: 'Optional extended description in CommonMark or HTML',
          parameters: [
            {
            in: 'path',
            name: "oauth_access_token",
            required: true,
            type: "string",
          }
        ],
            
            
        }
      }
    }
  },
  apis: ['./*.ts'], // Adjust the path to your route definitions
};

const specs = swaggerJsdoc(options);
export { specs }
