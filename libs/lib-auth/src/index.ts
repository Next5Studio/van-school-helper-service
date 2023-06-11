import { APP_GUARD } from '@nestjs/core'
import { Global, Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'

import { AuthService } from './service'
import { AuthGuard } from './guard'

export * from './service'
export * from './guard'

@Global()
@Module({
    imports: [HttpModule],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard
        },
        AuthService
    ],
    exports: [AuthService]
})
export class AuthModule {}
