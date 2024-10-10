import { Controller, Post, Body, Get, Put, Delete, Res, HttpStatus, Logger, Param } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Response } from 'express';

@Controller('api/v1/cruds/company')
export class CompanyController {
  private readonly logger = new Logger(CompanyController.name);

  constructor(private readonly companyService: CompanyService) {}
/*
  @Post('/create')
  async create(@Body() createCompanyDto: CreateCompanyDto, @Res() res: Response) {
    this.logger.log('Create company request received');
    try {
      // Llama al servicio para crear la compañía y captura el resultado
      const company = await this.companyService.create(createCompanyDto);
      this.logger.log('Company created successfully with ID: ' + company.id);
      return res.status(HttpStatus.CREATED).json(company);
    } catch (error) {
      this.logger.error('Error creating company', error.stack);
      return res.status(HttpStatus.CONFLICT).send(error.message);
    }
  }
      
  */

  @Get('/getall')
  async findAll(@Res() res: Response) {
    this.logger.log('Find all companies request received');
    const companies = await this.companyService.findAll();
    this.logger.log('All companies retrieved successfully');
    return res.status(HttpStatus.OK).json(companies);
  }

  @Get('/get/:id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    this.logger.log(`Find company by ID request received for ID: ${id}`);
    try {
      const company = await this.companyService.findById(id);
      return res.status(HttpStatus.OK).json(company);
    } catch (error) {
      this.logger.warn(`Company not found for ID: ${id}`);
      return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
  }

  @Put('/update/id')
  async update(@Body('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto, @Res() res: Response) {
    this.logger.log(`Update company request received for ID: ${id}`);
    try {
      const updatedCompany = await this.companyService.update(updateCompanyDto);
      return res.status(HttpStatus.OK).json(updatedCompany);
    } catch (error) {
      this.logger.warn(`Company not found for ID: ${id}`);
      return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
  }

  @Delete('/delete/id')
  async remove(@Body('id') id: string, @Res() res: Response) {
    this.logger.log(`Delete company request received for ID: ${id}`);
    try {
      await this.companyService.remove(id);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      this.logger.warn(`Company not found for ID: ${id}`);
      return res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
  }
}
