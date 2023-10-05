import http from "@/utils/http"

import { LoginUser, User, UserDto, R, PasswordDto } from "@/model"

export function getMeAPI() {
  return http.get<R<User>>("/user/me")
}

//登录
export function goLoginAPI(data: LoginUser) {
  return http.post<R<string>>("/user/login", data)
}

//访客登录
export function tourAPI() {
  return http.get<R<string>>("/user/tour")
}

//下载用户手册
export function getUseAPI() {
  return http({
    url: "/user/use",
    responseType: "blob",
  })
}

export function listStudentAPI(classId:any,exmaId:any) {
  return http.get<R<UserDto[]>>(
    `/user/class?classId=${classId}&examId=${exmaId}`
  )
}

export function logoutAPI() {
  return http<R<null>>("/user/logout")
}

export function sendCodeAPI() {
  return http.get<R<null>>("/user/code")
}

//修改密码
export function updateAPI(data:PasswordDto) {
  return http.put<R<null>>("/user/pwd",data)
}

export function getIsLoginAPI() {
   return http.get<R<null>>('/user/isLogin')
}