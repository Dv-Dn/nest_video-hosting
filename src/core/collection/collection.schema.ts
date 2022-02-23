import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

@Schema()
export class Collection {
    @Prop()
    authorId: string

    @Prop()
    videosId: string[]

    @Prop()
    title: string

    @Prop()
    description: string
}

export type CollectionDocument = Collection & Document

export const CollectionSchema = SchemaFactory.createForClass(Collection)
