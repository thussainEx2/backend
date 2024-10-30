import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';
import { IsOptional, IsPositive, IsBoolean } from 'class-validator';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  @IsOptional()
  @IsPositive()
  quantity?: number;

  @IsOptional()
  @IsBoolean()
  isPurchased?: boolean;
}
