import { BaseContentService, IBaseContentDTO } from './base-content.service'
import { Moment } from '../models/moment.model'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'

export interface ICreateMomentDTO extends IBaseContentDTO {
    userId: string
    momentId: string
    content: string
    gallery?: Array<string>
}

@Injectable()
export class MomentService extends BaseContentService<
    Moment,
    ICreateMomentDTO
> {
    constructor(
        @InjectModel(Moment.name)
        model: Model<Moment>
    ) {
        super(model)
    }
}
