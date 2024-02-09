import { setupServer } from 'msw/node'
import {
  listItinerariesHandler,
  getUserHandler,
  getUsersNameByIdHandler,
  loginHandler,
  updateUserHandler,
  registerHandler,
  validateTokenHandler,
} from './ssoHandlers'

const handlers = [
  loginHandler,
  registerHandler,
  validateTokenHandler,
  getUserHandler,
  updateUserHandler,
  getUsersNameByIdHandler,
  listItinerariesHandler,
]

export const ssoServer = setupServer(...handlers)
