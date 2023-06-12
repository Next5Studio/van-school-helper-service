import { HostingOptions, WebApplication } from '@lib/lib-core'
import { NestApplicationOptions } from '@nestjs/common'
import { ContentApplicationModule } from './module'
import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger'

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

    protected buildApplicationDocument(
        builder: DocumentBuilder
    ): Omit<OpenAPIObject, 'paths'> & { route: string } {
        return {
            route: 'api/v1/doc',
            ...builder
                .setTitle('Content Service API')
                .setDescription('API documention for content service.')
                .setVersion('1.0')
                .build()
        }
    }
}
