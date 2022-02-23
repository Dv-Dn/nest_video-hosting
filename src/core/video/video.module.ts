import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from '../auth/auth.module'
import { FileService } from '../file/file.service'
import { Comment, CommentSchema } from './schemas/comment.schema'
import { Video, VideoSchema } from './schemas/video.schema'
import { VideoController } from './video.controller'
import { VideoService } from './video.service'

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
        MongooseModule.forFeature([
            { name: Comment.name, schema: CommentSchema },
        ]),
        AuthModule,
    ],
    controllers: [VideoController],
    providers: [VideoService, FileService],
})
export class VideoModule {}
