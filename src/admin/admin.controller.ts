import { Controller, Post, Body, Get, Put, Delete, Res, HttpStatus, Logger } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Response } from 'express';

@Controller('api/v1/cruds/admin/')
export class AdminController {
  // Logger instance to log the messages
  private readonly logger = new Logger(AdminController.name);

  // Injecting the AdminService
  constructor(private readonly adminService: AdminService) {}

  // Throws an error if the email already exists (409)
  @Post('/create')
  async create(@Body() createAdminDto: CreateAdminDto, @Res() res: Response) {
    this.logger.log('Create admin request received');

    try {

      const admin = await this.adminService.create(createAdminDto);
      this.logger.log('Admin created successfully with ID: ' + admin.id);
      return res.status(HttpStatus.CREATED).json(admin);

    } catch (error) {

      this.logger.error('Error creating admin', error.stack);
      return res.status(HttpStatus.CONFLICT).send(error.message);

    }
  }

  // Doesnt throw an error
  @Get(['/getall', '/get/all', '/get-all', '/get'])
  async findAll(@Res() res: Response) {

    this.logger.log('Find all admins request received');

    const admins = await this.adminService.findAll();
    this.logger.log('All admins retrieved successfully');
    return res.status(HttpStatus.OK).json(admins);

  }

  // Throws an error if the ID is not found (404)
  @Get('/get/id')
  async findById(@Body('id') id: string, @Res() res: Response) {

    this.logger.log(`Find admin by ID request received for ID: ${id}`);

    try {

      const admin = await this.adminService.findById(id);
      if (!admin) {

        this.logger.warn(`Admin not found for ID: ${id}`);
        return res.status(HttpStatus.NOT_FOUND);

      }

      this.logger.log(`Admin found for ID: ${id}`);
      return res.status(HttpStatus.OK).json(admin);

    } catch (error) {

      this.logger.error('Error finding admin by ID', error.stack);
      return res.status(HttpStatus.NOT_FOUND).send(error.message);

    }
  }

  // Throws an error if the email is not found (404)
  @Get('get/email')
  async findByEmail(@Body() body: { email: string }, @Res() res: Response) {
    const { email } = body;
    this.logger.log(`Find admin by email request received for email: ${email}`);

    try {
      const admin = await this.adminService.findByEmail(email);
      this.logger.log(`Admin found for email: ${email}`);
      return res.status(HttpStatus.OK).json(admin);

    } catch (error) {
      this.logger.warn(`Admin not found for email: ${email}`);
      return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
  }

  // Throws an error if the ID is not found (404)
  @Put('update/id')
  async update(@Body('id') id: string, @Body() updateAdminDto: UpdateAdminDto, @Res() res: Response) {
    this.logger.log(`Update admin request received for ID: ${id}`);
    try {

      const updatedAdmin = await this.adminService.update(updateAdminDto);
      if (!updatedAdmin) {
        this.logger.warn(`Admin not found for ID: ${id}`);
        return res.status(HttpStatus.NOT_FOUND);
      }
      this.logger.log(`Admin updated successfully for ID: ${id}`);
      return res.status(HttpStatus.OK).json(updatedAdmin);
      
    } catch (error) {
      this.logger.error('Error updating admin', error.stack);
      return res.status(HttpStatus.NOT_FOUND).send(error.message);
      
    }

  }

  // Throws an error if the ID is not found (404)
  @Delete('delete/id')
  async remove(@Body('id') id: string, @Res() res: Response) {

    this.logger.log(`Delete admin request received for ID: ${id}`);

    try {

      await this.adminService.remove(id);
      this.logger.log(`Admin deleted successfully for ID: ${id}`);
      return res.status(HttpStatus.OK).send();
      
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }
  }

  // Throws an error if the email is not found (404)
  @Delete('delete/email')
  async removeByEmail(@Body('email') email: string, @Res() res: Response) {
    
    this.logger.log(`Delete admin request received for email: ${email}`);
    
    try {
      
      await this.adminService.removeByEmail(email);
      this.logger.log(`Admin deleted successfully for email: ${email}`);
      return res.status(HttpStatus.OK).send();
      
    } catch (error) {
      
      return res.status(HttpStatus.NOT_FOUND).send();
    
    }

  }
}
