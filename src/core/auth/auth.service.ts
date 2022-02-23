import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { AuthInterface } from './auth.interface'
import { compare } from 'bcrypt'

import { CreateUserDto, LoginUserDto, UserDto } from '../user/dto/'

@Injectable()
export class AuthService {
    constructor(
        private _UserService: UserService,
        private jwtService: JwtService
    ) {}

    async login({ password, email }) {
        try {
            const res = await this._UserService.findOneByEmail(email)
            return res && (await compare(password, res.password))
                ? this.getToken(email, res._id).then((result) => result)
                : new HttpException(
                      'User is already exist',
                      HttpStatus.UNAUTHORIZED
                  )
        } catch (err) {
            console.error(err)
        }
    }

    async getToken(email, id): Promise<string> {
        try {
            const res = await this.jwtService.signAsync({ email, id })
            console.log(res)
            return res
        } catch (err) {
            console.error(err)
        }
    }

    async registration(
        userDto: CreateUserDto
    ): Promise<AuthInterface.RegistrationStatus> {
        let status: AuthInterface.RegistrationStatus = {
            success: true,
            message: 'user registered',
        }

        try {
            await this._UserService.create(userDto)
        } catch (err) {
            status = {
                success: false,
                message: err,
            }
        }

        return status
    }

    async validateUser(id) {
        const user = await this._UserService.findOne(id)
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
        }
        return user
    }
}
