import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes } from 'mongoose'

@Schema({
    collection: 'tb_van_comments',
    _id: false
})
export class Comment extends Document {
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
    commentId: string

    @Prop({
        required: true
    })
    content: string

    @Prop({
        index: true,
        required: true
    })
    belongsToCommentId: string

    @Prop({
        index: true
    })
    replyToCommentId: string
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
