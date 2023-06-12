import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes } from 'mongoose'

import { Content } from './content.model'

@Schema({
    collection: 'tb_van_moments',
    _id: false
})
export class Moment extends Content<any> {
    @Prop({
        index: true,
        required: true
    })
    userId: string

    @Prop({
        type: SchemaTypes.ObjectId,
        index: true,
        required: true
    })
    momentId: string

    @Prop({
        type: SchemaTypes.Array
    })
    gallery: Array<string>

    @Prop({
        required: true
    })
    content: string
}

export const MomentSchema = SchemaFactory.createForClass(Moment)
