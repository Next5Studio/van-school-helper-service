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
        MongooseModule.forFeature([
            { name: Moment.name, schema: MomentSchema },
            { name: Propose.name, schema: ProposeSchema }
        ])
    ],
    providers: [MomentService, ProposeService],
    controllers: [AvatarController, MomentController, ProposeController]
})
export class ContentApplicationModule {}
