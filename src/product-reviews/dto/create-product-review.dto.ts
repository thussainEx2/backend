import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductReviewDto {
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  productId: number; // Assuming you want to link this to a product
}
