import { readFileSync } from 'fs'
import { INestApplication, NestApplicationOptions } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ExpressAdapter } from '@nestjs/platform-express'

const express = require('express')
const node_http = require('http')
const node_https = require('https')

export type HostingOptions<T = {}> = T & {
    hostingOptions: {
        http?: {
            port: number
        }
        https?: {
            port: number
            key: string
            cert: string
        }
    }
}

export abstract class WebHost {
    protected _app: INestApplication

    protected _module: any

    abstract options: HostingOptions<NestApplicationOptions>

    protected constructor(module: any) {
        this._module = module
    }

    async bootstrap() {
        const {
            hostingOptions: { http, https },
            ...nestOptions
        } = this.options

        // 创建基础服务
        const server = express()
        this._app = await NestFactory.create(
            this._module,
            new ExpressAdapter(server),
            nestOptions
        )
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

export class WebHostRunner {
    private readonly _hosts: Array<WebHost>

    private constructor(hosts: Array<WebHost>) {
        this._hosts = hosts
    }

    static withHost(...hosts: Array<new () => WebHost>) {
        return new WebHostRunner(hosts.map((Host) => new Host()))
    }

    public async run() {
        for (const host of this._hosts) {
            host.bootstrap()
        }
    }
}
