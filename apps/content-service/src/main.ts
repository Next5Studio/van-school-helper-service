import { ContentServiceModule } from './content-service.module'
import { HostingOptions, WebHost } from '@lib/lib-core'
import { NestApplicationOptions } from '@nestjs/common'

export class ContentServer extends WebHost {
    options: HostingOptions<NestApplicationOptions> = {
        hostingOptions: {
            http: {
                port: 3002
            }
        }
    }

    constructor() {
        super(ContentServiceModule)
    }
}
