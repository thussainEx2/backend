// src/orders/order.controller.ts

import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDetailsDto } from './dto/order-details.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<{ orderNumber: string }> {
    return await this.orderService.create(createOrderDto);
  }

  @Get('userId/:userId')
  async getOrdersByUserId(
    @Param('userId') userId: string,
  ): Promise<OrderDetailsDto[]> {
    return this.orderService.getOrdersByUserId(+userId);
  }
}
