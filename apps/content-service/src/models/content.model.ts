import { Document, SchemaTypes } from 'mongoose'
import { Schema, Prop } from '@nestjs/mongoose'

@Schema()
export class Content<T = any> extends Document {
    @Prop({
        required: true,
        index: true
    })
    type: string

    @Prop({ type: SchemaTypes.Mixed })
    metadata: T

    @Prop({
        default: Date.now
    })
    createdAt: Date

    @Prop({
        default: Date.now
    })
    updatedAt: Date
}
