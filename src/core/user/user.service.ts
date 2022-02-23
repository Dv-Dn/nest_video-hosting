import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CreateUserDto, LoginUserDto, UserDto } from './dto'
import { UserDocument, User } from './user.schema'
import { hash, compare } from 'bcrypt'

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async findOne(id: Types.ObjectId) {
        try {
            return await this.userModel.findById(id).exec()
        } catch (err) {
            console.error(err)
        }
    }
    async findOneByEmail(email: string) {
        try {
            return await this.userModel.findOne({ email })
        } catch (err) {
            console.error(err)
        }
    }

    async findAll(limit = 10, start = 0) {
        try {
            return await this.userModel
                .find()
                .select('-password')
                .skip(+start)
                .limit(+limit)
        } catch (error) {}
    }

    async create(dto: CreateUserDto) {
        try {
            const userInDb = await this.userModel.findOne({
                email: dto.email,
            })

            if (userInDb) {
                throw new HttpException(
                    'User already exists',
                    HttpStatus.BAD_REQUEST
                )
            }

            const password = await hash(dto.password, 10)

            return await new this.userModel({
                ...dto,
                password,
            }).save()
        } catch (err) {
            console.error(err)
        }
    }

    async update(id, dto) {
        try {
            return await this.userModel.findByIdAndUpdate(id, dto)
        } catch (err) {
            console.error(err)
        }
    }

    async updatePassword(_id, userPass, newPass) {
        try {
            const User = await this.userModel.findById({ _id: _id })
            if (await compare(userPass, User.password)) {
                User.password = await hash(newPass, 10)
                return await new this.userModel(User).save()
            }
        } catch (err) {
            console.error(err)
        }
    }

    async delete(_id: string) {
        try {
            return await this.userModel.findByIdAndDelete(_id).exec()
        } catch (err) {
            console.error(err)
        }
    }
}
