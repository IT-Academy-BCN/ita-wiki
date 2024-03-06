import { pathRoot } from '../../../routes/routes'
import { registry } from '../../registry'

registry.registerPath({
  method: 'get',
  tags: ['auth'],
  path: `${pathRoot.v1.auth}/logout`,
  description: 'Deletes cookie and logouts user',
  summary: 'Logs out user',
  responses: {
    204: {
      description: 'User has been logged out successfully',
    },
  },
})
