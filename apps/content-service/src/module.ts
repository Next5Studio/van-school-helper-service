import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigService } from '@nestjs/config'

import { SharedModule } from '@lib/lib-core'

import { MomentController } from './controllers/moment.controller'
import { AvatarController } from './controllers/avatar.controller'
import { ProposeController } from './controllers/propose.controller'

@Module({
    imports: [
        SharedModule,
        MongooseModule.forRootAsync({
            useFactory: (config: ConfigService) => {
                const dbOptions = config.get('config.content.db')
                return dbOptions
            },
            inject: [ConfigService]
        })
    ],
    providers: [],
    controllers: [AvatarController, MomentController, ProposeController]
})
export class ContentApplicationModule {}
