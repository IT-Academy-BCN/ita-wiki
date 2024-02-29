import { AsyncLocalStorage } from 'async_hooks'

export const jwtLocalStorage = new AsyncLocalStorage()
