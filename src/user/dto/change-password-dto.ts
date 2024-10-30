import { IsString, IsNotEmpty } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  existingPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
