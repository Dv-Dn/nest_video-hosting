import { Types } from 'mongoose'

export class AddVideoDto {
    name: string
    userId: Types.ObjectId
    description: string
    tags: string[]
    video: File
    image: File
}
