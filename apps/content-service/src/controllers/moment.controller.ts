import { ApiTags } from '@nestjs/swagger'
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'
import { Response } from '@lib/lib-core'

import { MomentService, CreateMomentDTO } from '../services/moment.service'

@ApiTags('校园动态相关')
@Controller('api/v1/moment')
export class MomentController {
    constructor(private readonly momentService: MomentService) {}

    @Get('all')
    async all() {
        return Response.ok(await this.momentService.findAll())
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return Response.ok(await this.momentService.findOne(id))
    }

    @Post()
    async create(@Body() data: CreateMomentDTO) {
        return Response.created(await this.momentService.create(data))
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updates: CreateMomentDTO) {
        return Response.ok(await this.momentService.update(id, updates))
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.momentService.delete(id)
        return Response.noContent()
    }
}
