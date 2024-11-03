import { Controller, Post, Body, Get, Put, Delete, Param, Res, HttpStatus, Logger } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { UpdateMeetingsDto } from './dto/update-meetings.dto';
import { UpdateGroupsUsersDto } from './dto/update-groups-users.dto';
import { Response } from 'express';

@Controller('api/v1/cruds/company')
export class CompanyController {
  private readonly logger = new Logger(CompanyController.name);

  constructor(private readonly companyService: CompanyService) {}

  @Post('/create')
  async create(@Body() createCompanyDto: CreateCompanyDto, @Res() res: Response) {
    this.logger.log('Create company request received');
    try {
      const company = await this.companyService.create(createCompanyDto);
      this.logger.log('Company created successfully with ID: ' + company.id);
      return res.status(HttpStatus.CREATED).json(company);
    } catch (error) {
      this.logger.error('Error creating company', error.stack);
      return res.status(HttpStatus.CONFLICT).send(error.message);
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    this.logger.log('Get company request received for ID: ' + id);
    try {
      const company = await this.companyService.findOne(id);
      return res.status(HttpStatus.OK).json(company);
    } catch (error) {
      this.logger.error('Error getting company', error.stack);
      return res.status(HttpStatus.NOT_FOUND).send(error.message);
    }
  }

  @Get('/get/all')
  async findAll(@Res() res: Response) {
    this.logger.log('Get all companies request received');
    try {
      const companies = await this.companyService.findAll();
      return res.status(HttpStatus.OK).json(companies);
    } catch (error) {
      this.logger.error('Error getting all companies', error.stack);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto, @Res() res: Response) {
    this.logger.log('Update company request received for ID: ' + id);
    try {
      const company = await this.companyService.update(id, updateCompanyDto);
      return res.status(HttpStatus.OK).json(company);
    } catch (error) {
      this.logger.error('Error updating company', error.stack);
      return res.status(HttpStatus.CONFLICT).send(error.message);
    }
  }

  @Delete('/:id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    this.logger.log('Delete company request received for ID: ' + id);
    try {
      await this.companyService.delete(id);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      this.logger.error('Error deleting company', error.stack);
      return res.status(HttpStatus.CONFLICT).send(error.message);
    }
  }

  @Put('/:id/meetings')
  async updateMeetings(@Param('id') id: string, @Body() updateMeetingsDto: UpdateMeetingsDto, @Res() res: Response) {
    this.logger.log('Update meetings request received for company ID: ' + id);
    try {
      const company = await this.companyService.updateMeetings(id, updateMeetingsDto);
      return res.status(HttpStatus.OK).json(company);
    } catch (error) {
      this.logger.error('Error updating meetings', error.stack);
      return res.status(HttpStatus.CONFLICT).send(error.message);
    }
  }

  @Get('/get/email/:email')
  async getByEmail(@Param('email') email: string, @Res() res: Response) {
    this.logger.log('Get company by email request received for email: ' + email);
    try {
      const company = await this.companyService.getByEmail(email);
      return res.status(HttpStatus.OK).json(company);
    } catch (error) {
      this.logger.error('Error getting company by email', error.stack);
      return res.status(HttpStatus.NOT_FOUND).send({ message: error.message });
    }
  }  

  @Put('/:id/groups-users')
  async updateGroupsUsers(@Param('id') id: string, @Body() updateGroupsUsersDto: UpdateGroupsUsersDto, @Res() res: Response) {
    this.logger.log('Update groups and users request received for company ID: ' + id);
    try {
      const company = await this.companyService.updateGroupsUsers(id, updateGroupsUsersDto);
      return res.status(HttpStatus.OK).json(company);
    } catch (error) {
      this.logger.error('Error updating groups and users', error.stack);
      return res.status(HttpStatus.CONFLICT).send(error.message);
    }
  }
}