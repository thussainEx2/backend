import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { compare, hash } from 'bcryptjs';
import { ChangePasswordDto } from './dto/change-password-dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async editUser(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async resetPassword(loginUserDto: LoginUserDto) {
    const { emailId, password } = loginUserDto;

    const user = await this.userRepository.findOne({ where: { emailId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.password = password;
    await this.userRepository.save(user);
    return true;
  }

  async changePassword(changePasswordDto: ChangePasswordDto, userId: number) {
    const { existingPassword, newPassword } = changePasswordDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      return { message: 'User not found' };
    }

    const isPasswordValid = await compare(existingPassword, user.password);
    if (!isPasswordValid) {
      return { message: 'Existing password is incorrect' };
    }

    if (existingPassword === newPassword) {
      return {
        message: 'New password cannot be the same as the existing password',
      };
    }

    user.password = await hash(newPassword, 10);
    await this.userRepository.save(user);

    return { message: 'Password changed successfully' };
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({
      where: { emailId: createUserDto.emailId },
    });

    if (existingUser) {
      throw new ConflictException('User already exists with this email ID.');
    }

    const user = new User();
    user.fullName = createUserDto.fullName;
    user.emailId = createUserDto.emailId;
    user.mobileNumber = createUserDto.mobileNumber;

    user.password = await hash(createUserDto.password, 10);

    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async loginUser(loginUserDto: LoginUserDto): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { emailId: loginUserDto.emailId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await compare(loginUserDto.password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<boolean> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return false;
    }
    Object.assign(user, updateUserDto);
    await this.userRepository.save(user);

    return true;
  }

  remove(id: number) {
    this.userRepository.delete(id);
  }
}
