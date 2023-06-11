import * as url from 'url'
import { Injectable, Logger } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'

import { decodePayload, RemoteService } from '@lib/lib-core'

@Injectable()
export class AuthService extends RemoteService {
    public constructor(
        logger: Logger,
        httpService: HttpService,
        private readonly configService: ConfigService
    ) {
        super(httpService, logger)
    }

    get Host() {
        const { auth } = this.configService.get('services')
        return auth
    }

    /**
     * 验证token是否合法
     * @param token
     */
    async auth(token: string) {
        const path = url.resolve(this.Host, '/internal/v1/auth')
        this.logger.log(
            `request to remote service: ${path}, query with <${token}>`,
            AuthService.name
        )

        const { data } = await this.httpService.axiosRef.get(path, {
            params: {
                token
            }
        })

        this.logger.log(JSON.stringify(data), AuthService.name)
        return data?.success ?? false
    }

    /**
     * 获取当前用户id
     * @param token 需要获取用户id的token
     */
    async getUserId(token?: string) {
        return decodePayload(token)
    }
}
