import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

export enum Roles {
    Admin = 'Admin',
    Basic = 'Basic',
}

@Schema()
export class User {
    @Prop()
    email: string

    @Prop()
    password: string

    @Prop()
    username: string

    @Prop()
    firstName: string

    @Prop()
    lastName: string

    @Prop()
    image?: string

    @Prop()
    videos: string[]

    @Prop()
    role?: Roles

    @Prop()
    collections: number

    @Prop()
    isEmailConfirmed: boolean

    @Prop()
    likes: string[]

    @Prop()
    dislikes: string

    @Prop({ type: [{ type: Types.ObjectId, ref: 'comment' }] })
    comments: string[]

    @Prop()
    createdAt: string = new Date().toISOString()
}

export type UserDocument = User & Document

export const UserSchema = SchemaFactory.createForClass(User)
