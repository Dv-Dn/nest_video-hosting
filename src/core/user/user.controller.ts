import { Role } from '@/role/entities/role.entity'
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common'
import { Types } from 'mongoose'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
    constructor(private _UserService: UserService) {}

    @Get()
    getAll(@Query('limit') limit: number, @Query('start') start: number) {
        return this._UserService.findAll(limit, start)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getOne(@Param('id') id: Types.ObjectId) {
        return this._UserService.findOne(id)
    }
}
