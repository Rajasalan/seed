const Joi = require('joi');
const sampleService = require('../service/sample-service');

module.exports = function (server) {
  server.route({
    path: '/samples',
    method: 'GET',
    handler(req, h) {
      return sampleService.list();
    },
    options: {
      description: 'Gets the list of Samples',
      tags: ['api'],
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
      }
    }
  });

  server.route({
    path: '/samples',
    method: 'POST',
    handler(req, h) {
      return sampleService.index(req.payload);
    },
    options: {
      description: '   a Sample',
      tags: ['api'],
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
      },
      validate: {
        payload: {
          content: Joi.object().required(),
        },
        failAction: async (request, h, err) => { throw err; }
      }
    }
  });

  server.route({
    path: '/samples/{id}',
    method: 'PUT',
    handler(req, h) {
      const { id, ...sample } = req.payload;
      return sampleService.index(sample, req.params.id);
    },
    options: {
      description: 'Delete a Sample',
      tags: ['api'],
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
      },
      validate: {
        params: {
          id: Joi.string().required()
        },
        payload: {
          content: Joi.object().required(),
        }
      }
    }
  });

  server.route({
    path: '/samples/{id}',
    method: 'DELETE',
    handler(req, h) {
      return sampleService.del(req.params.id);
    },
    options: {
      description: 'Delete a Sample',
      tags: ['api'],
      cors: {
        origin: ['*'],
        additionalHeaders: ['cache-control', 'x-requested-with']
      },
  
      validate: {
        params: {
          id: Joi.string().required()
        }
      }
    }
  });
}