import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import { SchemaTypes, Types } from 'mongoose'
import { Content } from './content.model'

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
export class Comment extends Content {
    @Prop({
        type: SchemaTypes.ObjectId,
        index: true
    })
    commentId: Types.ObjectId

    @Prop({
        index: true,
        required: true
    })
    relatedContentId: string

    @Prop({
        index: true,
        required: true
    })
    userId: string

    @Prop({
        index: true,
        default: 'CONTENT_COMMENT'
    })
    type: string

    @Prop({
        required: true
    })
    content: string

    @Prop({
        index: true,
        default: null
    })
    belongsToCommentId: string | null

    @Prop({
        index: true,
        default: null
    })
    replyToCommentId: string | null
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
