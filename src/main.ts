// env
import { config } from 'dotenv'
config()
//

import { NestFactory } from '@nestjs/core'

import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify'

import ffu from 'fastify-file-upload'
import secureSession from 'fastify-secure-session'
import { IndexModule } from './core'
import { fastifyHelmet } from 'fastify-helmet'

const start = async () => {
    try {
        const PORT = process.env.PORT || 5001

        const app = await NestFactory.create<NestFastifyApplication>(
            IndexModule,
            new FastifyAdapter()
        )

        app.register(secureSession, {
            secret: process.env.SECURE_SESSION_SECRET,
            salt: process.env.SECURE_SESSION_SALT,
        })

        app.register(fastifyHelmet)

        app.register(ffu)

        app.enableCors()

        await app.listen(PORT, () => console.log('server started'))
    } catch (error) {
        console.log(error)
    }
}

start()
