import {  Module } from '@nestjs/common'

import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from '../auth/auth.module'
import { CollectionController } from './collection.controller'
import { Collection, CollectionSchema } from './collection.schema'
import { CollectionService } from './collection.service'

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Collection.name, schema: CollectionSchema },
        ]),
        AuthModule,
    ],
    controllers: [CollectionController],
    providers: [CollectionService],
})

export class CollectionModule {}
