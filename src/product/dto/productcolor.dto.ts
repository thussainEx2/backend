import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ProductSizeDTO } from './productsize.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ProductColorDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  colorName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  colorImages?: string[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  sizes?: ProductSizeDTO[];
}
