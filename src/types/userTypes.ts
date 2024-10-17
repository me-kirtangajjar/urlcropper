import { EUserRole } from '../constant/userConstant'

export interface IUser {
    firstName: string
    lastName: string
    email: string
    password: string
    role: EUserRole
}

export interface IRegisterUserRequestBody {
    firstName: string
    lastName: string
    email: string
    password: string
}

export interface ILoginUserRequestBody {
    email: string
    password: string
}
