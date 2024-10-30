import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsNotEmpty,
  IsOptional,
  IsDate,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  emailId: string;

  @IsPhoneNumber(null)
  @IsNotEmpty()
  mobileNumber: string;

  @IsString()
  @IsOptional()
  gender?: string;

  @IsDate()
  @IsOptional()
  dateOfBirth: Date;

  @IsString()
  @IsOptional()
  location: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
