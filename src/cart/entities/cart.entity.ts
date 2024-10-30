import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.carts, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Product, (product) => product.carts)
  product: Product;

  @Column()
  quantity: number;

  @Column()
  size: string;

  @Column()
  variantId: number;

  @Column({ default: false })
  isPurchased: boolean;
}
