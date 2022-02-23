import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CollectionDocument, Collection } from './collection.schema'
import { AddCollectionDto } from './dto/add-collection.dto'

@Injectable()
export class CollectionService {
    constructor(
        @InjectModel(Collection.name)
        private collectionModel: Model<CollectionDocument>
    ) {}
    async create(dto: AddCollectionDto): Promise<Collection> {
        try {
            const video = await new this.collectionModel({
                ...dto,
                createdAt: new Date(),
            }).save()

            return video
        } catch (error) {}
    }

    async findOne(id: Types.ObjectId) {
        try {
            return await this.collectionModel.findById(id).exec()
        } catch (err) {
            console.error(err)
        }
    }

    async findAll(limit = 10, start = 0) {
        try {
            return await this.collectionModel
                .find()
                .select('-password')
                .skip(+start)
                .limit(+limit)
        } catch (error) {}
    }
    async delete(id: Types.ObjectId): Promise<Types.ObjectId> {
        try {
            return (await this.collectionModel.findByIdAndDelete(id))._id
        } catch (error) {}
    }
}
