import { Model } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'

import { BaseContentService, BaseContentDTO } from './base-content.service'
import { Moment } from '../models/moment.model'

export class CreateMomentDTO extends BaseContentDTO {
    @ApiProperty()
    userId: string

    @ApiProperty()
    content: string

    @ApiProperty({
        required: false
    })
    gallery?: Array<string>
}

@Injectable()
export class MomentService extends BaseContentService<Moment, CreateMomentDTO> {
    constructor(
        @InjectModel(Moment.name)
        model: Model<Moment>
    ) {
        super(model)
    }
}
