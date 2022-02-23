import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { AuthInterface } from '../auth.interface'

import { UserDto } from '@/core/user/dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private _AuthService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        })
    }

    async validate(payload) {
        const user = await this._AuthService.validateUser(payload._id)
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
        }
        return user
    }
}
