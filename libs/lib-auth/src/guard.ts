import anymatch from 'anymatch'
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthService } from './service'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly configService: ConfigService,
        private readonly authService: AuthService,
        private readonly logger: Logger
    ) {
        logger.log('initializing auth guard', AuthGuard.name)
        logger.log(
            `bypassed patterns: ${JSON.stringify(this.BypassedPatterns)}`,
            AuthGuard.name
        )
    }

    get BypassedPatterns() {
        return this.configService.get('bypassedPatterns')
    }

    get BypassedAll() {
        return this.configService.get('bypassedAll')
    }

    async canActivate(context: ExecutionContext) {
        // 放行所有请求
        if (this.BypassedAll) return true

        const { headers, url } = context.switchToHttp().getRequest()

        // 跳过已配置的patterns
        for (const pattern of this.BypassedPatterns) {
            const bypassed = anymatch(pattern, url)
            this.logger.log(
                `matcher: ${pattern}, url: ${url}, matched: ${bypassed}`,
                AuthGuard.name
            )
            if (bypassed) return bypassed
        }
        const token = headers.authorization

        return await this.authService.auth(token)
    }
}
