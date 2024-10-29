import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Logger, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post("/create")
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    await this.userService.createUser(createUserDto);
    return res.status(HttpStatus.OK).send("User created successfully");
  }


  @Get(['/getall', '/get/all', '/get-all', '/get'])
  async findAll(@Res() res: Response) {
    const users = await this.userService.getAllUsers();
    return res.status(HttpStatus.OK).json(users);
  }
  

  @Get('/get/id')
  async findById(@Body('id') id: string, @Res() res: Response) {
    this.logger.log(`Find user by ID request received for ID: ${id}`);

    try {

      const user = await this.userService.getUserById(id);
      console.log(user)
      if (!user) {

        this.logger.warn(`User not found for ID: ${id}`);
        return res.status(HttpStatus.NOT_FOUND);
      }

      this.logger.log(`User found for ID: ${id}`);
      return res.status(HttpStatus.OK).json(user);

    } catch (error) {

      this.logger.error('Error finding user by ID', error.stack);
      return res.status(HttpStatus.NOT_FOUND).send(error.message);

    }
  }

  @Get('/get/email')
  async findByEmail(@Body('email') email: string, @Res() res: Response) {
    this.logger.log(`Find user by email request received for email: ${email}`);

    try {

      const user = await this.userService.getUserByEmail(email);
      if (!user) {
        this.logger.warn(`User not found for email: ${email}`);
        return res.status(HttpStatus.NOT_FOUND);
      }

      this.logger.log(`User found for email: ${email}`);
      return res.status(HttpStatus.OK).json(user);

    } catch (error) {

      this.logger.error('Error finding user by email', error.stack);
      return res.status(HttpStatus.NOT_FOUND).send(error.message);

    }
  }


  @Patch('/update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }


  @Delete('/delete/:id')
  async remove(@Body('id') id: string, @Res() res: Response) {
    this.logger.log(`Delete user request received for ID: ${id}`);

    try {
      await this.userService.deleteUser(id);
      return res.status(HttpStatus.OK).send();
    } catch (error) {
      this.logger.error('Error deleting user', error.stack);
      return res.status(HttpStatus.NOT_FOUND).send(error.message);
  }
}
}