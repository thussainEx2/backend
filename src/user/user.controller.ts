import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Patch,
  Body,
  ConflictException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from './dto/change-password-dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<User | { message: string }> {
    try {
      const user = await this.userService.create(createUserDto);
      return user;
    } catch (error) {
      if (error instanceof ConflictException) {
        return { message: 'User exists' };
      }
      throw error;
    }
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get('/edit/:userId')
  async editUser(@Param('userId') id: string): Promise<User> {
    return this.userService.editUser(+id);
  }

  @Post('/login')
  async loginUser(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<User | { message: string }> {
    const user = await this.userService.loginUser(loginUserDto);

    if (user) {
      return user;
    }

    return { message: 'not found' };
  }

  @Post('/resetPass')
  async resetPassword(
    @Body() loginUserDto: LoginUserDto,
  ): Promise<User | { message: string }> {
    const status = await this.userService.resetPassword(loginUserDto);

    if (status) {
      return { message: 'changed' };
    } else {
      return { message: 'no' };
    }
  }

  @Patch('/changePass/:id')
  async changePassword(
    @Param('id') userId: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    return this.userService.changePassword(changePasswordDto, userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<{ success: boolean }> {
    const success = await this.userService.update(+id, updateUserDto);
    return { success: success };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
