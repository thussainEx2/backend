// src/orders/dto/order-details.dto.ts

import { IsString, IsNumber } from 'class-validator';

export class OrderDetailsDto {
  @IsNumber()
  quantity: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  image: string;

  @IsString()
  size: string;

  @IsNumber()
  rating: number;
}
