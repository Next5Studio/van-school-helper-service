import { ChatServiceModule } from './chat-service.module'
import { WebHost, HostingOptions } from '@lib/lib-core'
import { NestApplicationOptions } from '@nestjs/common'

export class ChatServer extends WebHost {
    options: HostingOptions<NestApplicationOptions> = {
        hostingOptions: {
            http: {
                port: 3001
            }
        }
    }

    constructor() {
        super(ChatServiceModule)
    }
}
