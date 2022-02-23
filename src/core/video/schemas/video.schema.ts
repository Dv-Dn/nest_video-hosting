import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

@Schema()
export class Video {
    @Prop()
    name: string

    @Prop()
    description: string

    @Prop()
    video: string

    @Prop()
    image: string

    @Prop()
    views: number

    @Prop()
    likes: number

    @Prop()
    dislikes: number

    @Prop()
    tags: string[]

    @Prop({ type: Types.ObjectId, ref: 'user' })
    userId: string

    @Prop({ type: [{ type: Types.ObjectId, ref: 'comment' }] })
    comments: Comment[]

    @Prop()
    createdAt: Date
}

export type VideoDocument = Video & Document

export const VideoSchema = SchemaFactory.createForClass(Video)
