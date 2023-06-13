import { ApiTags } from '@nestjs/swagger'
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Query
} from '@nestjs/common'
import { Response } from '@lib/lib-core'

import { CommentService, CreateCommentDTO } from '../services/comment.service'

@ApiTags('评论相关')
@Controller('api/v1/comment')
export class CommentController {
    constructor(private readonly CommentService: CommentService) {}

    @Get('all')
    async all(
        @Query('page') page = 1,
        @Query('pageNum') pageNum = 10,
        @Query('sort') sort: 'ASC' | 'DESC' = 'DESC'
    ) {
        return Response.ok(
            await this.CommentService.findAll(page, pageNum, sort)
        )
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return Response.ok(await this.CommentService.findOne(id))
    }

    @Get()
    async findAllByContentId(
        @Query('page') page = 1,
        @Query('pageNum') pageNum = 10,
        @Query('sort') sort: 'ASC' | 'DESC' = 'DESC',
        @Query('relatedContentId') relatedContentId: string
    ) {
        return Response.ok(
            await this.CommentService.findByRelatedContentId(
                page,
                pageNum,
                sort,
                relatedContentId
            )
        )
    }

    @Post()
    async create(@Body() data: CreateCommentDTO) {
        return Response.created(await this.CommentService.create(data))
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updates: CreateCommentDTO) {
        return Response.ok(await this.CommentService.update(id, updates))
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.CommentService.delete(id)
        return Response.noContent()
    }
}
