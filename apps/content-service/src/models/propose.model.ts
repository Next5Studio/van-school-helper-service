import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, Types } from 'mongoose'

import { Content } from './content.model'

@Schema({
    collection: 'tb_van_propose',
    toJSON: {
        transform: (doc, ret) => {
            ret.proposeId = ret._id
            delete ret._id
            delete ret.__v
        }
    }
})
export class Propose extends Content {
    @Prop({
        type: SchemaTypes.ObjectId,
        index: true
    })
    proposeId: Types.ObjectId

    @Prop({
        index: true,
        required: true
    })
    userId: string

    @Prop({
        index: true,
        default: 'CONTENT_PROPOSE'
    })
    type: string

    @Prop({
        required: true
    })
    cover: string

    @Prop({
        required: true
    })
    content: string

    constructor() {
        super('CONTENT_PROPOSE')
    }
}

export const ProposeSchema = SchemaFactory.createForClass(Propose)
