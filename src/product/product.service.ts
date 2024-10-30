import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDTO } from './dto/create-product.dto';
import { ProductColor } from './entities/productcolor.entity';
import { ProductSize } from './entities/productsize.entity';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductType } from './entities/productType.entity';
import { Gender } from './entities/gender.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const product = this.productRepository.create({
      name: createProductDTO.name,
      description: createProductDTO.description,
      price: createProductDTO.price,
      rating: createProductDTO.rating,
      discount: createProductDTO.discount,
      thumbImage: createProductDTO.thumbImage,
      productCategory: {
        id: createProductDTO.productCategoryId,
      } as ProductCategory,
      productType: { id: createProductDTO.productTypeId } as ProductType,
      gender: { id: createProductDTO.genderId } as Gender,
    });

    // Process color variations if they exist
    if (createProductDTO.colors) {
      product.colors = createProductDTO.colors.map((color) => {
        const productColor = new ProductColor();
        productColor.colorName = color.colorName;
        productColor.colorImages = color.colorImages;

        productColor.sizes = color.sizes.map((size) => {
          const productSize = new ProductSize();
          productSize.sizeName = size.sizeName;
          productSize.inventory = size.inventory;
          productSize.isAvailable = size.inventory > 0;
          return productSize;
        });

        return productColor;
      });
    }

    try {
      return await this.productRepository.save(product);
    } catch (error) {
      console.error('Error saving product:', error);
      throw new InternalServerErrorException('Failed to create product');
    }
  }
  async getProductById(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['colors', 'colors.sizes'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async getProductsByTypeId(productTypeId: number): Promise<Product[]> {
    return await this.productRepository.find({
      where: { productType: { id: productTypeId } },
      relations: ['colors', 'colors.sizes'],
    });
  }
}
