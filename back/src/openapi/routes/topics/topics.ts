import { pathRoot } from '../../../routes/routes'
import { registry } from '../../registry'

registry.registerPath({
  method: 'get',
  tags: ['topics'],
  path: `${pathRoot.v1.topics}`,
  description: 'Returns a list of all topics',
  summary: 'Returns topics',
  responses: {
    200: {
      description: 'The server has successfully received the parameter'
    },
  },
})
