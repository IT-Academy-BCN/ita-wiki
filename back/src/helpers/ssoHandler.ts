import { Context } from 'koa'
import { TSsoLoginRequest, TSsoLoginResponse } from '../schemas/sso/ssoLogin'
import {
  TSsoRegisterRequest,
  TSsoRegisterResponse,
} from '../schemas/sso/ssoRegister'
import {
  TSsoValidateRequest,
  TSsoValidateResponse,
} from '../schemas/sso/ssoValidate'
import {
  TSsoGetUserRequest,
  TSsoGetUserResponse,
} from '../schemas/sso/ssoGetUser'
import { TSsoGetItinerariesResponse } from '../schemas/sso/ssoGetItineraries'
import { login, getUser, register, validate, getItineraries } from './sso'

interface SsoApiEndpoints {
  login(data: TSsoLoginRequest): Promise<TSsoLoginResponse>
  register(data: TSsoRegisterRequest): Promise<TSsoRegisterResponse>
  validate(
    ctx: Context,
    data: TSsoValidateRequest
  ): Promise<TSsoValidateResponse>
  getUser(data: TSsoGetUserRequest): Promise<TSsoGetUserResponse>
  getItineraries(): Promise<TSsoGetItinerariesResponse>
}

export const ssoHandler: SsoApiEndpoints = {
  login,
  register,
  validate,
  getUser,
  getItineraries,
}
