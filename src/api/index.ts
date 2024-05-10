
import request from '@/utils/htttp'

import type { LoginParamsType, responseLoginType } from "./types/authType";

/**
 * 登录接口
 * @param loginParams
 * @returns
 */
export const loginApi = (loginParams: LoginParamsType) => {
  return request<responseLoginType>("/auth/token", "POST", loginParams);
};