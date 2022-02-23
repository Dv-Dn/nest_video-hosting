import { Types } from 'mongoose'

export class AddCommentDto {
     userId: string
     text: string
     videoId: Types.ObjectId
}
