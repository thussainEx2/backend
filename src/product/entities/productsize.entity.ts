import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  OneToMany,
} from 'typeorm';
import { ProductColor } from './productcolor.entity';
import { OrderDetails } from 'src/order/entities/order-detail.entity';

@Entity()
export class ProductSize {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductColor, (productColor) => productColor.sizes, {
    onDelete: 'CASCADE',
  })
  productColor: ProductColor;

  @Column()
  sizeName: string;

  @Column('int', { default: 0 })
  inventory: number;

  @Column({ default: true })
  isAvailable: boolean;

  @OneToMany(() => OrderDetails, (orderDetail) => orderDetail.productSize)
  orderDetails: OrderDetails[];
}
