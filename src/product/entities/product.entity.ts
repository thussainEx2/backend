// src/products/entities/product.entity.ts

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { ProductColor } from './productcolor.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { ProductReview } from 'src/product-reviews/entities/product-review.entity';
import { ProductCategory } from './productCategory.entity';
import { ProductType } from './productType.entity';
import { Gender } from './gender.entity';
import { OrderDetails } from 'src/order/entities/order-detail.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  thumbImage: string;

  @Column()
  description: string;

  @Column('decimal')
  price: number;

  @Column('decimal')
  rating: number;

  @Column('decimal', { nullable: true })
  discount?: number;

  @ManyToOne(() => Gender, (gender) => gender.products)
  gender: Gender;

  @OneToMany(() => ProductColor, (productColor) => productColor.product, {
    cascade: true,
  })
  colors: ProductColor[];

  @OneToMany(() => Cart, (cart) => cart.product)
  carts: Cart[];

  @OneToMany(() => ProductReview, (review) => review.product)
  reviews: ProductReview[];

  @ManyToOne(() => ProductCategory, (category) => category.products, {
    nullable: true,
  })
  productCategory: ProductCategory;

  @ManyToOne(() => ProductType, (type) => type.products, { nullable: true })
  productType: ProductType;

  @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.product)
  orderDetails: OrderDetails[];
}
