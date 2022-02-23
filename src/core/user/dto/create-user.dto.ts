export class CreateUserDto {
    username: string
    password: string
    email: string
    firstName: string
    lastName: string
    createdAt: string = new Date().toISOString()
}
