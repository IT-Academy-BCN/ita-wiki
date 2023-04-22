import { appConfig } from '../../../config/config'
import { registry } from '../../registry'

const prefix = '/topics'
registry.registerPath({
  method: 'get',
  tags: ['topics'],
  path: `${appConfig.pathRoot}${prefix}`,
  description: 'Returns a list of all topics',
  summary: 'Returns topics',
  responses: {
    200: {
      description: 'The server has successfully received the parameter'
    },
  },
})
