// src/products/entities/productcolor.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToMany,
} from 'typeorm';
import { Product } from './product.entity';
import { ProductSize } from './productsize.entity';
import { OrderDetails } from 'src/order/entities/order-detail.entity';

@Entity()
export class ProductColor {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.colors, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @Column()
  colorName: string;

  @Column('simple-array')
  colorImages: string[];

  @OneToMany(() => ProductSize, (productSize) => productSize.productColor, {
    cascade: true,
  })
  sizes: ProductSize[];

  @OneToMany(() => OrderDetails, (orderDetail) => orderDetail.productColor)
  orderDetails: OrderDetails[];
}
