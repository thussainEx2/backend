// src/orders/dto/create-order.dto.ts

import {
  IsString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsArray,
  ValidateNested,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from '../entities/order.entity';

export class CreateOrderDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  mobileNumber: string;

  @IsString()
  streetAddress: string;

  @IsString()
  zipCode: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsNumber()
  orderTotal: number;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsNumber()
  deliveryCharge?: number;

  @IsEnum(OrderStatus)
  orderStatus: OrderStatus;

  @IsNumber()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderDetailDto)
  orderDetails: OrderDetailDto[];
}

class OrderDetailDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  discount?: number;

  @IsNumber()
  productColorId: number;

  @IsNumber()
  productSizeId: number;

  @IsNumber()
  quantity: number;
}
