import { Model, PaginateModel } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

import { Content } from '../models/content.model'

export class BaseContentDTO<T = any> {
    @ApiProperty({
        required: false
    })
    type?: string

    @ApiProperty({
        required: false
    })
    metadata?: T
}

export class BaseContentService<T extends Content, TCreateDto> {
    constructor(protected readonly Model: Model<T>) {}

    async create(doc: TCreateDto): Promise<T> {
        const content = new this.Model(doc)
        return await content.save()
    }

    async findAll(
        page: number,
        pageNum: number,
        sort: 'ASC' | 'DESC' = 'DESC'
    ) {
        const options = {
            page,
            limit: pageNum,
            // 按照创建时间倒序排列
            sort: { createdAt: sort === 'DESC' ? -1 : 1 }
        }
        const data = await (this.Model as PaginateModel<T>).paginate(
            {},
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

    async findOne(id: string): Promise<T> {
        return this.Model.findById(id).exec()
    }

    async update(id: string, doc: TCreateDto): Promise<T> {
        return this.Model.findByIdAndUpdate(
            id,
            {
                ...doc,
                updatedAt: Date.now()
            },
            { new: true }
        )
    }

    async delete(id: string): Promise<void> {
        await this.Model.findByIdAndRemove(id)
    }
}
