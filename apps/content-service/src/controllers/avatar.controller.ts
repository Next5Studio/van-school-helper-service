import { Response as ExpressResponse } from 'express'
import { toPng } from 'jdenticon'
import { Controller, Get, Param, Res } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('头像相关')
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
