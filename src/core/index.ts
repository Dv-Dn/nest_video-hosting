import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { FileModule } from './file/file.module'
import { UserModule } from './user/user.module'
import { VideoModule } from './video/video.module'
import * as path from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'
import { AuthModule } from './auth/auth.module'
import { CollectionModule } from './collection/collection.module'

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname, 'static'),
        }),
        MongooseModule.forRoot(process.env.MONGO_DB),
        AuthModule,
        UserModule,
        VideoModule,
        FileModule,
        CollectionModule,
    ],
})
export class IndexModule {}
