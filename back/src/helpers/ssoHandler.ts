import { Context } from 'koa'
import {
  login,
  getMeUsers,
  register,
  validate,
  updateUser,
  listUsers,
  listItineraries,
} from './sso'
import {
  TSsoGetUserRequest,
  TSsoGetUserResponse,
  TSsoGetUsersNameByIdRequest,
  TSsoListUsersResponse,
  TSsoListItinerariesResponse,
  TSsoLoginRequest,
  TSsoLoginResponse,
  TSsoUpdateUserRequest,
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
  getMeUsers(data: TSsoGetUserRequest): Promise<TSsoGetUserResponse>
  listUsers(data: TSsoGetUsersNameByIdRequest): Promise<TSsoListUsersResponse>
  updateUser(data: TSsoUpdateUserRequest): Promise<void>
  listItineraries(): Promise<TSsoListItinerariesResponse>
}

export const ssoHandler: SsoApiEndpoints = {
  login,
  register,
  validate,
  getMeUsers,
  listUsers,
  updateUser,
  listItineraries,
}
