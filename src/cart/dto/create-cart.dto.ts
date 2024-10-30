import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateCartDto {
  @ApiProperty({ required: true })
  @IsPositive()
  userId: number;

  @ApiProperty({ required: true })
  @IsPositive()
  productId: number;

  @ApiProperty({ required: true })
  @IsPositive()
  variantId: number;

  @ApiProperty({ required: true })
  @IsPositive()
  size: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsPositive()
  quantity: number;
}
