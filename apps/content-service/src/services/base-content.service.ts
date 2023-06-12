import { Model } from 'mongoose'
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

    async findAll(): Promise<T[]> {
        return await this.Model.find().exec()
    }

    async findOne(id: string): Promise<T> {
        return await this.Model.findById(id).exec()
    }

    async update(id: string, doc: TCreateDto): Promise<T> {
        return await this.Model.findByIdAndUpdate(
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
