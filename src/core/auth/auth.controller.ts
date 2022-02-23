import {
    Controller,
    Post,
    Body,
    HttpException,
    HttpStatus,
} from '@nestjs/common'
import { LoginUserDto } from '../user/dto'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { AuthInterface } from './auth.interface'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
    constructor(private _AuthService: AuthService) {}

    @Post('login')
    public async login(@Body() loginUserDto: LoginUserDto) {
        return await this._AuthService.login(loginUserDto)
    }

    @Post('register')
    public async register(
        @Body() createUserDto: CreateUserDto
    ): Promise<AuthInterface.RegistrationStatus> {
        const result: AuthInterface.RegistrationStatus =
            await this._AuthService.registration(createUserDto)

        if (!result.success) {
            throw new HttpException(result.message, HttpStatus.BAD_REQUEST)
        }

        return result
    }
}
