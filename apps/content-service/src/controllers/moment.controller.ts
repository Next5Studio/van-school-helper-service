import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common'
import { MomentService, ICreateMomentDTO } from '../services/moment.service'
import { Moment } from '../models/moment.model'
import { Response } from '@lib/lib-core'

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
    async create(@Body() data: ICreateMomentDTO) {
        return Response.created(await this.momentService.create(data))
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updates: ICreateMomentDTO) {
        return Response.ok(await this.momentService.update(id, updates))
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.momentService.delete(id)
        return Response.noContent()
    }
}
