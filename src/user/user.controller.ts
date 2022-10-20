import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    // return this.userService.create(createUserDto);
    const user = await this.userService.create(data);
    return {
      statusCode: HttpStatus.OK,
      message: 'Users created successfully',
      user,
    };
  }

  @Get()
  async getAll() {
    // return this.userService.findAll();
    const users = await this.userService.getAll();
    return {
      statusCode: HttpStatus.OK,
      message: 'Users fetched successfully',
      users,
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    // return this.userService.findOne(+id);
    const data = await this.userService.getById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User fetched successfully',
      data,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() data: UpdateUserDto) {
    // return this.userService.update(+id, updateUserDto);
    await this.userService.update(id, data);
    return {
      statusCode: HttpStatus.OK,
      message: 'User updated successfully',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    // return this.userService.remove(+id);
    await this.userService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'User deleted successfully',
    };
  }
}
