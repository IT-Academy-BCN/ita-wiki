import { setupServer } from 'msw/node'
import {
  getItinerariesHandler,
  getUserHandler,
  getUsersNameByIdHandler,
  loginHandler,
  patchUserHandler,
  registerHandler,
  validateTokenHandler,
} from './ssoHandlers'

const handlers = [
  loginHandler,
  registerHandler,
  validateTokenHandler,
  getUserHandler,
  patchUserHandler,
  getUsersNameByIdHandler,
  getItinerariesHandler,
]

export const ssoServer = setupServer(...handlers)
