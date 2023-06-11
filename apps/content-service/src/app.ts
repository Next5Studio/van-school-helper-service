import { HostingOptions, WebApplication } from '@lib/lib-core'
import { NestApplicationOptions } from '@nestjs/common'
import { ContentApplicationModule } from './module'

export class ContentApplication extends WebApplication {
    options: HostingOptions<NestApplicationOptions> = {
        hostingOptions: {
            http: {
                port: 3002
            }
        }
    }

    constructor() {
        super(ContentApplicationModule)
    }
}
