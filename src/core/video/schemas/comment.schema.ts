import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Video } from './video.schema'
import { Document, Types } from 'mongoose'

export type CommentDocument = Comment & Document

@Schema()
export class Comment {
    @Prop()
    title: string

    @Prop()
    text: string

    @Prop({ type: Types.ObjectId, ref: 'Video' })
    videoId: Video

    @Prop({ type: Types.ObjectId, ref: 'User' })
    userId: string
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
