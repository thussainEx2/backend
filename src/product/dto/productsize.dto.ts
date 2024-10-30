import { IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class ProductSizeDTO {
  @IsString()
  @IsNotEmpty()
  sizeName: string;

  @IsPositive()
  stock: number;
}
