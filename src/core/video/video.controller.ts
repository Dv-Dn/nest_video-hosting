import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    Req,
    Res,
    UseGuards,
} from '@nestjs/common'
import { Types } from 'mongoose'
import { FastifyRequest, FastifyReply } from 'fastify'

import { AddCommentDto } from './dto/add-comment.dto'

import { VideoService } from './video.service'
import { AddVideoDto } from './dto/add-video.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'

@Controller('videos')
export class VideoController {
    constructor(private _VideoService: VideoService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Req() req: FastifyRequest, @Res() res: FastifyReply) {
        const dto = req.body as AddVideoDto

        return this._VideoService.create(dto), res.send()
    }

    @Get()
    getAll(@Query('limit') limit: number, @Query('start') start: number) {
        return this._VideoService.findAll(limit, start)
    }

    @Get('search')
    search(@Query('q') query: string) {
        return this._VideoService.search(query)
    }

    @Get(':id')
    getOne(@Param('id') id: Types.ObjectId) {
        return this._VideoService.findOne(id)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id: Types.ObjectId) {
        return this._VideoService.delete(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post('comment')
    addComment(@Body() dto: AddCommentDto) {
        return this._VideoService.addComment(dto)
    }

    @Post('watch')
    watch(@Query('id') id: Types.ObjectId) {
        return this._VideoService.watch(id)
    }
}
