import { resolve } from 'path'
import { cwd } from 'process'
import { APP_FILTER } from '@nestjs/core'
import { Global, Logger, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '@lib/lib-auth'

import { ConfigurationBuilder } from '../builders/ConfigurationBuilder'
import { HttpExceptionFilter } from '../filters/HttpExceptionFilter'

@Global()
@Module({
    imports: [
        ConfigModule.forRoot({
            ignoreEnvFile: true,
            isGlobal: true,
            load: [
                async () => {
                    // 可以根据process.env来控制加载什么json文件
                    return await new ConfigurationBuilder()
                        .addJsonFile(
                            resolve(cwd(), './config/local.config.json')
                        )
                        .build()
                }
            ]
        }),
        AuthModule
    ],
    providers: [
        Logger,
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        }
    ],
    exports: [Logger]
})
export class SharedModule {}
