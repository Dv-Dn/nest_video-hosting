import { Types } from 'mongoose'

export class AddCollectionDto {
    authorId: Types.ObjectId
    videosId: Types.ObjectId[]
    title: string
    description: string
}
