import { Module } from '@nestjs/common'
import { SharedModule } from '@lib/lib-core'

import { AvatarController } from './controllers/avatar.controller'

@Module({
    imports: [SharedModule],
    providers: [],
    controllers: [AvatarController]
})
export class ContentApplicationModule {}
