import {
  IsString,
  IsDecimal,
  IsArray,
  IsOptional,
  IsNotEmpty,
  ValidateNested,
  IsInt,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class SizeDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sizeName: string;

  @ApiProperty()
  @IsInt()
  inventory: number;
}

class ColorDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  colorName: string;

  @ApiProperty({ type: [String] })
  @IsArray()
  colorImages: string[];

  @ApiProperty({ type: [SizeDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SizeDTO)
  sizes: SizeDTO[];
}

export class CreateProductDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  productCategoryId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  productTypeId: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  genderId: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  thumbImage: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsDecimal()
  price: number;

  @ApiProperty()
  @IsDecimal()
  rating: number;

  @ApiProperty()
  @IsDecimal()
  @IsOptional()
  discount?: number;

  @ApiProperty({ type: [ColorDTO] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ColorDTO)
  colors: ColorDTO[];
}
