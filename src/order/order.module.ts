import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductSize } from 'src/product/entities/productsize.entity';
import { ProductColor } from 'src/product/entities/productcolor.entity';
import { OrderDetails } from './entities/order-detail.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      User,
      Product,
      ProductSize,
      ProductColor,
      OrderDetails,
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
