import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, Types } from 'mongoose'

@Schema({
    collection: 'tb_van_comments',
    toJSON: {
        transform: (doc, ret) => {
            ret.commentId = ret._id
            delete ret._id
            delete ret.__v
        }
    }
})
export class Comment extends Document {
    @Prop({
        type: SchemaTypes.ObjectId,
        index: true
    })
    commentId: Types.ObjectId

    @Prop({
        index: true,
        required: true
    })
    userId: string

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
