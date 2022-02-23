import { FileTypes } from '@/constants/fileTypes'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, ObjectId, Types } from 'mongoose'
import { FileService } from '../file/file.service'
import { AddCommentDto } from './dto/add-comment.dto'
import { AddVideoDto } from './dto/add-video.dto'
import { Comment, CommentDocument } from './schemas/comment.schema'
import { Video, VideoDocument } from './schemas/video.schema'

@Injectable()
export class VideoService {
    constructor(
        @InjectModel(Video.name) private videoModel: Model<VideoDocument>,
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
        private _FileService: FileService
    ) {}

    async create(dto: AddVideoDto): Promise<Video> {
        try {
            const videoPath = this._FileService.createFile(
                FileTypes.VIDEO,
                dto.video
            )
            const imagePath = this._FileService.createFile(
                FileTypes.IMAGE,
                dto.image
            )

            const video = await new this.videoModel({
                ...dto,
                views: 0,
                likes: 0,
                dislikes: 0,
                comments: [],
                video: videoPath,
                image: imagePath,
                createdAt: new Date(),
            }).save()

            return video
        } catch (error) {}
    }

    async findAll(limit = 10, start = 0) {
        try {
            return await this.videoModel
                .find()
                .skip(+start)
                .limit(+limit)
        } catch (error) {}
    }

    async findOne(id: Types.ObjectId) {
        try {
            return await this.videoModel.findById(id)
        } catch (error) {}
    }

    async delete(id: Types.ObjectId): Promise<Types.ObjectId> {
        try {
            return (await this.videoModel.findByIdAndDelete(id))._id
        } catch (error) {}
    }

    async search(query: string): Promise<Video[]> {
        try {
            return await this.videoModel.find({
                name: { $regex: new RegExp(query, 'i') },
            })
        } catch (error) {}
    }

    async watch(id: Types.ObjectId) {
        try {
            const video = await this.videoModel.findById(id)
            video.views += 1
            video.save()
        } catch (error) {}
    }

    async addComment(dto: AddCommentDto): Promise<Comment> {
        try {
            const video = await this.videoModel.findById(dto.videoId)
            const comment = await new this.commentModel({ ...dto }).save()
            video.comments.push(comment.id)
            await video.save()

            return comment
        } catch (error) {}
    }
}
