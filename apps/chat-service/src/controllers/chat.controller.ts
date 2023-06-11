import { Controller, Get, Query } from '@nestjs/common'
import { AuthService } from '@lib/lib-auth'

@Controller('api/v1/chat')
export class ChatController {
    constructor(private readonly authService: AuthService) {}

    @Get('auth')
    async status(@Query('token') token: string) {
        await this.authService.auth(token)
        return 'Hello, World.'
    }
}
