import { Context } from 'koa'
import {
  login,
  getUser,
  register,
  validate,
  getItineraries,
  patchUser,
  getUsersNameById,
} from './sso'
import {
  TSsoGetItinerariesResponse,
  TSsoGetUserRequest,
  TSsoGetUserResponse,
  TSsoGetUsersNameByIdRequest,
  TSsoGetUsersNameByIdResponse,
  TSsoLoginRequest,
  TSsoLoginResponse,
  TSsoPatchUserRequest,
  TSsoRegisterRequest,
  TSsoRegisterResponse,
  TSsoValidateRequest,
  TSsoValidateResponse,
} from '../schemas/sso'

interface SsoApiEndpoints {
  login(data: TSsoLoginRequest): Promise<TSsoLoginResponse>
  register(data: TSsoRegisterRequest): Promise<TSsoRegisterResponse>
  validate(
    ctx: Context,
    data: TSsoValidateRequest
  ): Promise<TSsoValidateResponse>
  getUser(data: TSsoGetUserRequest): Promise<TSsoGetUserResponse>
  getUsersNameById(
    data: TSsoGetUsersNameByIdRequest
  ): Promise<TSsoGetUsersNameByIdResponse>
  patchUser(data: TSsoPatchUserRequest): Promise<void>
  getItineraries(): Promise<TSsoGetItinerariesResponse>
}

export const ssoHandler: SsoApiEndpoints = {
  login,
  register,
  validate,
  getUser,
  getUsersNameById,
  patchUser,
  getItineraries,
}
