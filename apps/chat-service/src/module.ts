import { Module } from '@nestjs/common'
import { SharedModule } from '@lib/lib-core'

import { ChatController } from './controllers/chat.controller'
import { MessageGateway } from './gateway'

@Module({
    imports: [SharedModule],
    providers: [MessageGateway],
    controllers: [ChatController]
})
export class ChatApplicationModule {}
