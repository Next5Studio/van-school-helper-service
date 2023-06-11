import { Controller, Get, Param, Res } from '@nestjs/common'
import { Response as ExpressResponse } from 'express'
import { toPng } from 'jdenticon'
import { ConfigService } from '@nestjs/config'

@Controller('api/v1/avatar')
export class AvatarController {
    constructor(private readonly configService: ConfigService) {}

    get AvatarSize() {
        return this.configService.get('config')?.content?.avatarSize ?? 200
    }

    @Get(':uuid')
    async getMineAvatar(
        @Param('uuid') uuid: string,
        @Res() res: ExpressResponse
    ) {
        const buffer = toPng(uuid, this.AvatarSize)
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': buffer.length
        })
        res.end(buffer)
    }
}
