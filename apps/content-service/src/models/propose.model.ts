import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes } from 'mongoose'

import { Content } from './content.model'

@Schema({
    collection: 'tb_van_propose',
    _id: false
})
export class Propose extends Content<any> {
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
    proposeId: string

    @Prop({
        required: true
    })
    cover: string

    @Prop({
        required: true
    })
    content: string
}

export const ProposeSchema = SchemaFactory.createForClass(Propose)
