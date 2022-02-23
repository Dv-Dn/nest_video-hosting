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

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { AddCollectionDto } from './dto/add-collection.dto'
import { CollectionService } from './collection.service'

@Controller('collections')
export class CollectionController {
    constructor(private _CollectionService: CollectionService) {}
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() dto: AddCollectionDto) {
        return this._CollectionService.create(dto)
    }


    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    delete(@Param('id') id: Types.ObjectId) {
        return this._CollectionService.delete(id)
    }
}
