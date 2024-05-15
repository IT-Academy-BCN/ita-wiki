import { describe, it, expect, vi, afterEach } from 'vitest'
import { Context } from 'koa'
import jwt from 'jsonwebtoken'
import { appConfig } from '../../../config'
import { authenticate } from '../../../middleware/authenticate'
import { validateUserAndToken } from '../../../utils/authHelper'
import { InvalidCredentials } from '../../../utils/errors'
import { generateToken } from '../../../utils/jwtAuth'
import { testUserData } from '../../globalSetup'

vi.mock('../../../utils/authHelper', () => ({
  validateUserAndToken: vi.fn(),
}))

vi.mock('../../../utils/jwtAuth', () => ({
  generateToken: vi.fn(),
}))

const next = vi.fn()

describe('authenticate middleware', () => {
  const createContext = (headers = {}, cookies = {}, body = {}) => {
    const ctx = {
      request: {
        headers,
        body,
      },
      cookies: {
        get: vi.fn((name) => cookies[name]),
        set: vi.fn(),
      },
      state: {},
    } as unknown as Context
    return ctx
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should set user in ctx.state and call next if authToken is valid', async () => {
    const ctx = createContext(
      { authorization: 'Bearer validAuthToken' },
      {},
      {}
    )
    vi.mocked(validateUserAndToken).mockResolvedValue(testUserData.admin)

    await authenticate(ctx, next)

    expect(validateUserAndToken).toHaveBeenCalledWith('auth', 'validAuthToken')
    expect(ctx.state.user).toEqual(testUserData.admin)
    expect(next).toHaveBeenCalled()
  })

  it('should throw InvalidCredentials if authToken is expired', async () => {
    const ctx = createContext(
      { authorization: 'Bearer expiredAuthToken' },
      {},
      {}
    )
    vi.mocked(validateUserAndToken).mockRejectedValue(
      new jwt.TokenExpiredError('jwt expired', new Date())
    )

    await expect(authenticate(ctx, next)).rejects.toThrow(InvalidCredentials)
    expect(validateUserAndToken).toHaveBeenCalledWith(
      'auth',
      'expiredAuthToken'
    )
    expect(next).not.toHaveBeenCalled()
  })

  it('should refresh token if authToken is expired and refreshToken is valid', async () => {
    const ctx = createContext({}, { refreshToken: 'validRefreshToken' }, {})
    const expiredAuthTokenError = new jwt.TokenExpiredError(
      'jwt expired',
      new Date()
    )
    const newAuthToken = 'newAuthToken'

    vi.mocked(validateUserAndToken)
      .mockRejectedValueOnce(expiredAuthTokenError)
      .mockResolvedValueOnce(testUserData.admin)
    vi.mocked(generateToken).mockReturnValue(newAuthToken)

    await authenticate(ctx, next)

    expect(validateUserAndToken).toHaveBeenCalledWith('auth', undefined)
    expect(validateUserAndToken).toHaveBeenCalledWith(
      'refresh',
      'validRefreshToken'
    )
    expect(generateToken).toHaveBeenCalledWith(testUserData.admin.id, 'auth')
    expect(ctx.cookies.set).toHaveBeenCalledWith('authToken', newAuthToken, {
      httpOnly: true,
      maxAge: appConfig.authCookieExpiration,
    })
    expect(ctx.state.user).toEqual(testUserData.admin)
    expect(next).toHaveBeenCalled()
  })

  it('should throw error if any other error occurs', async () => {
    const ctx = createContext(
      { authorization: 'Bearer invalidAuthToken' },
      {},
      {}
    )
    const genericError = new Error('Generic error')
    vi.mocked(validateUserAndToken).mockRejectedValue(genericError)

    await expect(authenticate(ctx, next)).rejects.toThrow(genericError)
    expect(validateUserAndToken).toHaveBeenCalledWith(
      'auth',
      'invalidAuthToken'
    )
    expect(next).not.toHaveBeenCalled()
  })
})
