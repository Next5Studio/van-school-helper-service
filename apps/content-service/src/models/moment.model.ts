import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, Types } from 'mongoose'

import { Content } from './content.model'

@Schema({
    collection: 'tb_van_moments',
    toJSON: {
        transform: (doc, ret) => {
            ret.momentId = ret._id
            delete ret._id
            delete ret.__v
        }
    }
})
export class Moment extends Content {
    @Prop({
        type: SchemaTypes.ObjectId,
        index: true
    })
    momentId: Types.ObjectId

    @Prop({
        index: true,
        required: true
    })
    userId: string

    @Prop({
        index: true,
        default: 'CONTENT_MOMENT'
    })
    type: string

    @Prop({
        required: true
    })
    content: string

    @Prop({
        type: SchemaTypes.Array
    })
    gallery: Array<string>
}

export const MomentSchema = SchemaFactory.createForClass(Moment)
