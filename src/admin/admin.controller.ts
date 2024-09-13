import { Controller, Post, Body, Get, Param, Put, Delete, Res, HttpStatus, Query, Logger } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Response } from 'express';

@Controller('api/v1/cruds/admin/')
export class AdminController {
  private readonly logger = new Logger(AdminController.name);

  constructor(private readonly adminService: AdminService) {}

  @Post('/create')
  async create(@Body() createAdminDto: CreateAdminDto, @Res() res: Response) {
    this.logger.log('Create admin request received');
    try {
      const admin = await this.adminService.create(createAdminDto);
      this.logger.log('Admin created successfully');
      return res.status(HttpStatus.CREATED).json(admin);
    } catch (error) {
      this.logger.error('Error creating admin', error.stack);
      return res.status(HttpStatus.CONFLICT).send(error.message);
    }
  }

  @Get(['/getall', '/get/all', '/get-all', '/get'])
  async findAll(@Res() res: Response) {
    this.logger.log('Find all admins request received');
    const admins = await this.adminService.findAll();
    this.logger.log('All admins retrieved successfully');
    return res.status(HttpStatus.OK).json(admins);
  }

  @Get('/get/id/:id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    this.logger.log(`Find admin by ID request received for ID: ${id}`);
    const admin = await this.adminService.findById(id);
    if (!admin) {
      this.logger.warn(`Admin not found for ID: ${id}`);
      return res.status(HttpStatus.NOT_FOUND);
    }
    this.logger.log(`Admin found for ID: ${id}`);
    return res.status(HttpStatus.OK).json(admin);
  }

  @Get('get/email/:email')
  async findByEmail(@Query('email') email: string, @Res() res: Response) {
    this.logger.log(`Find admin by email request received for email: ${email}`);
    const admin = await this.adminService.findByEmail(email);
    if (!admin) {
      this.logger.warn(`Admin not found for email: ${email}`);
      return res.status(HttpStatus.NOT_FOUND);
    }
    this.logger.log(`Admin found for email: ${email}`);
    return res.status(HttpStatus.OK).json(admin);
  }

  @Put('update/id/:id')
  async update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto, @Res() res: Response) {
    this.logger.log(`Update admin request received for ID: ${id}`);
    const updatedAdmin = await this.adminService.update(id, updateAdminDto);
    if (!updatedAdmin) {
      this.logger.warn(`Admin not found for ID: ${id}`);
      return res.status(HttpStatus.NOT_FOUND);
    }
    this.logger.log(`Admin updated successfully for ID: ${id}`);
    return res.status(HttpStatus.OK).json(updatedAdmin);
  }

  @Delete('delete/id/:id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    this.logger.log(`Delete admin request received for ID: ${id}`);
    await this.adminService.remove(id);
    this.logger.log(`Admin deleted successfully for ID: ${id}`);
    return res.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete('delete/email/:email')
  async removeByEmail(@Query('email') email: string, @Res() res: Response) {
    this.logger.log(`Delete admin request received for email: ${email}`);
    await this.adminService.removeByEmail(email);
    this.logger.log(`Admin deleted successfully for email: ${email}`);
    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
