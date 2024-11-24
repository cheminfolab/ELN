import React from "react";

export interface Tokens {
    access: string
    refresh: string
}

export interface User {
  token_type: string
  exp: number
  iat: number
  jti: string
  user_id: number
  email: string
}

export type LoginUserType = (event: any) => void
export type LogoutUserType = () => void
export type RegisterUserType = (event: any) => void

export type AuthContextType = {
    user: User
    setUser: React.Dispatch<React.SetStateAction<User>>
    authTokens: Tokens
    setAuthTokens: React.Dispatch<React.SetStateAction<Tokens>>
    loginUser: LoginUserType
    logoutUser: LogoutUserType
    registerUser: RegisterUserType
}

export type AuthModeType = "login" | "register"

export interface RegistrationForm {
    first_name: undefined | string
    last_name: undefined | string
    working_group: undefined | number
    status: undefined | number
    email: undefined | string
    password: undefined | string
    password2: undefined | string
}

export interface Errors {
    first_name?: string
    last_name?: string
    working_group?: string
    status?: string
    email?: string
    password?: string
    password2?: string
}