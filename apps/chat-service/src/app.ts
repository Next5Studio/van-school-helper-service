import { NestApplicationOptions } from '@nestjs/common'
import { WebApplication, HostingOptions } from '@lib/lib-core'

import { ChatApplicationModule } from './module'

export class ChatApplication extends WebApplication {
    options: HostingOptions<NestApplicationOptions> = {
        hostingOptions: {
            http: {
                port: 3001
            }
        }
    }

    constructor() {
        super(ChatApplicationModule)
    }
}
