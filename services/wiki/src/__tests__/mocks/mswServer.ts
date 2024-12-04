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
import { generateTextHandler } from './huggingFaceHandlers'

const handlers = [
  loginHandler,
  registerHandler,
  validateTokenHandler,
  getUserHandler,
  updateUserHandler,
  getUsersNameByIdHandler,
  listItinerariesHandler,
]
const huggingFaceHandlers = [generateTextHandler]

export const mswServer = setupServer(...handlers, ...huggingFaceHandlers)
