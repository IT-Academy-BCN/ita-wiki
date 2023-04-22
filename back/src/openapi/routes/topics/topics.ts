import { registry } from '../../registry'


const pathRoot = '/api/v1/topics'
registry.registerPath({
  method: 'get',
  tags: ['topics'],
  path: `${pathRoot}`,
  description: 'Returns a list of all topics',
  summary: 'Returns topics',
  responses: {
    200: {
      description: 'The server has successfully received the parameter'
    },
  },
})
