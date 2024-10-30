import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderDetails } from './entities/order-detail.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductColor } from 'src/product/entities/productcolor.entity';
import { ProductSize } from 'src/product/entities/productsize.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/user/entities/user.entity';
import { OrderDetailsDto } from './dto/order-details.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetails)
    private orderDetailsRepository: Repository<OrderDetails>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductColor)
    private productColorRepository: Repository<ProductColor>,
    @InjectRepository(ProductSize)
    private productSizeRepository: Repository<ProductSize>,
  ) {}

  async create(
    createOrderDto: CreateOrderDto,
  ): Promise<{ orderNumber: string }> {
    const order = this.orderRepository.create({
      orderNumber: this.generateOrderNumber(),
      firstName: createOrderDto.firstName,
      lastName: createOrderDto.lastName,
      email: createOrderDto.email,
      mobileNumber: createOrderDto.mobileNumber,
      streetAddress: createOrderDto.streetAddress,
      zipCode: createOrderDto.zipCode,
      city: createOrderDto.city,
      country: createOrderDto.country,
      orderTotal: createOrderDto.orderTotal,
      discount: createOrderDto.discount,
      deliveryCharge: createOrderDto.deliveryCharge,
      orderStatus: createOrderDto.orderStatus,
      user: { id: createOrderDto.userId } as User,
      orderDetails: [],
    });

    if (createOrderDto.orderDetails && createOrderDto.orderDetails.length > 0) {
      for (const details of createOrderDto.orderDetails) {
        const product = await this.productRepository.findOne({
          where: { id: details.productId },
        });
        if (!product) {
          throw new Error(`Product with ID ${details.productId} not found.`);
        }

        const productColor = await this.productColorRepository.findOne({
          where: { id: details.productColorId },
        });
        if (!productColor) {
          throw new Error(
            `Product color with ID ${details.productColorId} not found.`,
          );
        }

        const productSize = await this.productSizeRepository.findOne({
          where: { id: details.productSizeId },
        });
        if (!productSize) {
          throw new Error(
            `Product size with ID ${details.productSizeId} not found.`,
          );
        }

        const orderDetail = this.orderDetailsRepository.create({
          product,
          price: details.price,
          discount: details.discount || 0,
          productColor,
          productSize,
          quantity: details.quantity,
          // order,
        });

        order.orderDetails.push(orderDetail);
      }
    }

    try {
      console.log('Order before save:', JSON.stringify(order, null, 2));
      order.orderDetails.forEach((detail) => {
        console.log('Order Detail:', JSON.stringify(detail, null, 2));
      });
      const savedOrder = await this.orderRepository.save(order);
      console.log('Order saved successfully:', savedOrder);
      return { orderNumber: savedOrder.orderNumber };
    } catch (error) {
      console.error('Error saving order:', error);
      throw new Error('Could not save order. Please check the details.');
    }
  }

  private generateOrderNumber(): string {
    return `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }

  async getOrdersByUserId(userId: number): Promise<OrderDetailsDto[]> {
    const orders = await this.orderRepository.find({
      where: { user: { id: userId } },
      relations: [
        'orderDetails',
        'orderDetails.product',
        'orderDetails.productSize',
      ],
    });

    if (!orders.length) {
      throw new NotFoundException(`No orders found for user ID ${userId}.`);
    }

    // Flatten the order details into a single array
    return orders.flatMap((order) =>
      order.orderDetails.map((detail) => ({
        quantity: detail.quantity,
        name: detail.product.name,
        description: detail.product.description,
        image: detail.product.thumbImage,
        size: detail.productSize.sizeName,
        rating: detail.product.rating,
      })),
    );
  }
}
