export namespace AuthInterface {
    export interface RegistrationStatus {
        success: boolean
        message: string
    }
    export interface JwtPayload {
        username: string
    }

    export interface LoginStatus {
        username: string
        accessToken: any
        expiresIn: any
    }
}
