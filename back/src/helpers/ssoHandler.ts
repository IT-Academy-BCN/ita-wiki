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
import {
  login,
  getUser,
  register,
  validate,
  getItineraries,
  patchUser,
} from './sso'
import { TSsoPatchUserRequest } from '../schemas/sso/ssoPatchUser'

interface SsoApiEndpoints {
  login(data: TSsoLoginRequest): Promise<TSsoLoginResponse>
  register(data: TSsoRegisterRequest): Promise<TSsoRegisterResponse>
  validate(
    ctx: Context,
    data: TSsoValidateRequest
  ): Promise<TSsoValidateResponse>
  getUser(data: TSsoGetUserRequest): Promise<TSsoGetUserResponse>
  patchUser(data: TSsoPatchUserRequest): Promise<void>
  getItineraries(): Promise<TSsoGetItinerariesResponse>
}

export const ssoHandler: SsoApiEndpoints = {
  login,
  register,
  validate,
  getUser,
  patchUser,
  getItineraries,
}
