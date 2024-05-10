import request from "@/utils/htttp";
import type {
  LoginParamsType,
  responseLoginType,
  responseUserInfoType,
} from "./types/authType";

/**
 * 登录接口
 * @param loginParams
 * @returns
 */
export const loginApi = (loginParams: LoginParamsType) => {
  return request<responseLoginType>("/auth/token", "POST", loginParams);
};

/**
 * 获取用户信息接口
 * @returns
 */
export const userInfo = () => {
  return request<responseUserInfoType>("/system/menu/user", "GET");
};

/**
 * 退出登录接口
 */
export const userLogoutApi = () => {
  return request("/auth/logout", "POST");
};