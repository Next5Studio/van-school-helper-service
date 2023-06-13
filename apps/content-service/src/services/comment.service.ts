import { Model, PaginateModel } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'

import { BaseContentService, BaseContentDTO } from './base-content.service'
import { Comment } from '../models/comment.model'

export class CreateCommentDTO extends BaseContentDTO {
    @ApiProperty()
    relatedContentId: string

    @ApiProperty()
    userId: string

    @ApiProperty()
    content: string

    @ApiProperty({ required: false })
    belongsToCommentId: string

    @ApiProperty({ required: false })
    replyToCommentId: string
}

@Injectable()
export class CommentService extends BaseContentService<
    Comment,
    CreateCommentDTO
> {
    constructor(
        @InjectModel(Comment.name)
        model: Model<Comment>
    ) {
        super(model)
    }

    async findByRelatedContentId(
        page: number,
        pageNum: number,
        sort: 'ASC' | 'DESC' = 'DESC',
        relatedContentId: string
    ) {
        const options = {
            page,
            limit: pageNum,
            // 按照创建时间倒序排列
            sort: { createdAt: sort === 'DESC' ? -1 : 1 }
        }
        const data = await (this.Model as PaginateModel<Comment>).paginate(
            { relatedContentId },
            options
        )
        return {
            list: data.docs,
            pagination: {
                totalCount: data.totalDocs,
                currentPage: data.page,
                pageSize: data.limit
            }
        }
    }
}
