// src/orders/entities/order-details.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductSize } from 'src/product/entities/productsize.entity';
import { ProductColor } from 'src/product/entities/productcolor.entity';

@Entity()
export class OrderDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.orderDetails, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  discount: number;

  @Column()
  quantity: number;

  @ManyToOne(() => ProductColor, { onDelete: 'CASCADE' })
  productColor: ProductColor;

  @ManyToOne(() => ProductSize, { onDelete: 'CASCADE' })
  productSize: ProductSize;

  @ManyToOne(() => Order, (order) => order.orderDetails, {
    onDelete: 'CASCADE',
    // cascade: true,
  })
  order: Order;
}
