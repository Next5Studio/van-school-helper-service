import { Model } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { InjectModel } from '@nestjs/mongoose'
import { Injectable } from '@nestjs/common'

import { BaseContentService, BaseContentDTO } from './base-content.service'
import { Propose } from '../models/propose.model'

export class CreateProposeDTO extends BaseContentDTO {
    @ApiProperty()
    userId: string

    @ApiProperty()
    proposeId: string

    @ApiProperty()
    content: string

    @ApiProperty()
    cover: string

    constructor() {
        super()
        this.type = 'CONTENT_PROPOSE'
    }
}

@Injectable()
export class ProposeService extends BaseContentService<
    Propose,
    CreateProposeDTO
> {
    constructor(
        @InjectModel(Propose.name)
        model: Model<Propose>
    ) {
        super(model)
    }
}
