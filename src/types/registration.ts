export type ResponseRegistration={
    success: boolean,
    user: {
      email: string,
      name: string
    },
    accessToken: string,
    refreshToken: string
}

export type RequestRegistration={
    email: string,
    password: string,
    name: string
}