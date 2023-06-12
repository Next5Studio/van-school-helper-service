import * as paginate from 'mongoose-paginate-v2'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'

import { SharedModule } from '@lib/lib-core'

import { MomentController } from './controllers/moment.controller'
import { AvatarController } from './controllers/avatar.controller'
import { ProposeController } from './controllers/propose.controller'
import { MomentService } from './services/moment.service'
import { ProposeService } from './services/propose.service'
import { Moment, MomentSchema } from './models/moment.model'
import { Propose, ProposeSchema } from './models/propose.model'

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
            }
        ])
    ],
    providers: [MomentService, ProposeService],
    controllers: [AvatarController, MomentController, ProposeController]
})
export class ContentApplicationModule {}
