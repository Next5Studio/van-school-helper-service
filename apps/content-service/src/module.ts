import * as paginate from 'mongoose-paginate-v2'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'

import { SharedModule } from '@lib/lib-core'

import { MomentController } from './controllers/moment.controller'
import { AvatarController } from './controllers/avatar.controller'
import { ProposeController } from './controllers/propose.controller'
import { CommentController } from './controllers/comment.controller'
import { MomentService } from './services/moment.service'
import { ProposeService } from './services/propose.service'
import { CommentService } from './services/comment.service'
import { Moment, MomentSchema } from './models/moment.model'
import { Propose, ProposeSchema } from './models/propose.model'
import { Comment, CommentSchema } from './models/comment.model'

@Module({
    imports: [
        SharedModule,
        MongooseModule.forRootAsync({
            useFactory: (config: ConfigService) => {
                const dbOptions = config.get('config.content.db')
                return dbOptions
            },
            inject: [ConfigService]
        }),
        MongooseModule.forFeatureAsync([
            {
                name: Moment.name,
                useFactory: () => {
                    MomentSchema.plugin(paginate)
                    return MomentSchema
                }
            },
            {
                name: Propose.name,
                useFactory: () => {
                    ProposeSchema.plugin(paginate)
                    return ProposeSchema
                }
            },
            {
                name: Comment.name,
                useFactory: () => {
                    CommentSchema.plugin(paginate)
                    return CommentSchema
                }
            }
        ])
    ],
    providers: [MomentService, ProposeService, CommentService],
    controllers: [
        AvatarController,
        MomentController,
        ProposeController,
        CommentController
    ]
})
export class ContentApplicationModule {}
