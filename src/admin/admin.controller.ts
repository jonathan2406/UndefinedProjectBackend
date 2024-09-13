import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Res,
  HttpStatus,
  Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Response } from 'express';

@Controller('api/v1/cruds/admin/')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/create')
  async create(@Body() createAdminDto: CreateAdminDto, @Res() res: Response) {
    const admin = await this.adminService.create(createAdminDto);
    return res.status(HttpStatus.CREATED).json(admin);
  }

  @Get(['/getall', '/get/all', '/get-all', '/get'])
  async findAll(@Res() res: Response) {
    const admins = await this.adminService.findAll();
    return res.status(HttpStatus.OK).json(admins);
  }

  @Get('/get/id/:id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    const admin = await this.adminService.findById(id);
    if (!admin) {
      return res.status(HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json(admin);
  }

  @Get('get/email/:email')
  async findByEmail(@Query('email') email: string, @Res() res: Response) {
    const admin = await this.adminService.findByEmail(email);
    if (!admin) {
      return res.status(HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json(admin);
  }

  @Put('update/id/:id')
  async update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto, @Res() res: Response) {
    const updatedAdmin = await this.adminService.update(id, updateAdminDto);
    if (!updatedAdmin) {
      return res.status(HttpStatus.NOT_FOUND);
    }
    return res.status(HttpStatus.OK).json(updatedAdmin);
  }

  @Delete('delete/id/:id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.adminService.remove(id);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
