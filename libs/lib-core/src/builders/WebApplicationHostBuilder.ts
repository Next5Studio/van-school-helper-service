import { OpenDirOptions, readFileSync } from 'fs'
import {
    CanActivate,
    ExceptionFilter,
    INestApplication,
    NestApplicationOptions,
    NestInterceptor,
    PipeTransform
} from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const node_http = require('http')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const node_https = require('https')

type HostingOptions<T = any> = T & {
    hostingOptions: {
        http?: {
            port: number
        }
        https?: {
            port: number
            key: string
            cert: string
        }
        guards?: Array<CanActivate>
        filters?: Array<ExceptionFilter>
        interceptors?: Array<NestInterceptor>
        pips?: Array<PipeTransform>
    }
}

abstract class WebApplication {
    protected _app: INestApplication

    protected _module: any

    abstract options: HostingOptions<NestApplicationOptions>

    protected constructor(module: any) {
        this._module = module
    }

    protected buildApplicationDocument(
        builder: DocumentBuilder
    ): (Omit<OpenAPIObject, 'paths'> & { route: string }) | undefined {
        return undefined
    }

    async bootstrap() {
        const {
            hostingOptions: {
                http,
                https,
                guards,
                filters,
                interceptors,
                pips
            },
            ...nestOptions
        } = this.options

        // 创建基础服务
        const server = express()
        this._app = await NestFactory.create(
            this._module,
            new ExpressAdapter(server),
            nestOptions
        )
        if (guards?.length > 0) {
            this._app.useGlobalGuards(...guards)
        }
        if (filters?.length > 0) {
            this._app.useGlobalFilters(...filters)
        }
        if (interceptors?.length > 0) {
            this._app.useGlobalInterceptors(...interceptors)
        }
        if (pips?.length > 0) {
            this._app.useGlobalPipes(...pips)
        }

        const swaggerOptions = this.buildApplicationDocument(
            new DocumentBuilder()
        )
        if (swaggerOptions) {
            const { route, ...swaggerConfig } = swaggerOptions
            const document = SwaggerModule.createDocument(
                this._app,
                swaggerConfig
            )
            SwaggerModule.setup(route, this._app, document)
        }
        await this._app.init()

        // 监听端口
        if (http) {
            node_http.createServer(server).listen(http.port)
        }

        if (https) {
            node_https
                .createServer(
                    {
                        key: readFileSync(https.key),
                        cert: readFileSync(https.cert)
                    },
                    server
                )
                .listen(https.port)
        }
    }
}

class WebApplicationHostBuilder {
    private readonly applications: Array<WebApplication>

    private constructor(apps: Array<WebApplication>) {
        this.applications = apps
    }

    static withApplications(...apps: Array<new () => WebApplication>) {
        return new WebApplicationHostBuilder(apps.map((App) => new App()))
    }

    public async run() {
        for (const application of this.applications) {
            application.bootstrap()
        }
    }
}

export { WebApplicationHostBuilder, WebApplication, HostingOptions }
