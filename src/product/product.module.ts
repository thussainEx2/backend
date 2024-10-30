import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
import { ProductColor } from './entities/productcolor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductColor])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
