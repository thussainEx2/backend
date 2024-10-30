import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Gender {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // e.g., 'Men', 'Women', 'Unisex'

  @OneToMany(() => Product, (product) => product.gender)
  products: Product[];
}
