import { User } from "./user"

export type ResponseUpdateUser = {
    success: boolean, 
    user: User
}

export type RequestUpdateUser = {
    email?: string,
    name?:string,
    password?:string,
    token:string|null
}