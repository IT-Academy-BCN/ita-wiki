import { registry } from '../../registry'


const pathRoot = '/api/v1/topics'
registry.registerPath({
  method: 'get',
  tags: ['topics'],
  path: `${pathRoot}/category/:categoryId`,
  description: 'Takes a category Id and returns the list of topics sharing that category',
  summary: 'Returns topics by category',
  parameters: [
    {
      name: 'categoryId',
      in: 'path',
      required: true,
      description: 'ID of the category for which to retrieve topics'
    }
  ],
  responses: {
    200: {
      description: 'The server has successfully received the parameter'
    },
  },
})
