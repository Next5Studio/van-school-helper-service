import { ApiTags } from '@nestjs/swagger'
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Query
} from '@nestjs/common'
import { Response } from '@lib/lib-core'

import { ProposeService, CreateProposeDTO } from '../services/propose.service'

@ApiTags('表白墙相关')
@Controller('api/v1/propose')
export class ProposeController {
    constructor(private readonly ProposeService: ProposeService) {}

    @Get('all')
    async all(
        @Query('page') page = 1,
        @Query('pageNum') pageNum = 10,
        @Query('sort') sort: 'ASC' | 'DESC' = 'DESC'
    ) {
        return Response.ok(
            await this.ProposeService.findAll(page, pageNum, sort)
        )
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return Response.ok(await this.ProposeService.findOne(id))
    }

    @Post()
    async create(@Body() data: CreateProposeDTO) {
        return Response.created(await this.ProposeService.create(data))
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updates: CreateProposeDTO) {
        return Response.ok(await this.ProposeService.update(id, updates))
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.ProposeService.delete(id)
        return Response.noContent()
    }
}
