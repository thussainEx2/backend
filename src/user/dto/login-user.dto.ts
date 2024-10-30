import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @IsEmail()
  @IsNotEmpty()
  emailId: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
