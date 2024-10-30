import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDTO: CreateProductDTO): Promise<Product> {
    return this.productService.createProduct(createProductDTO);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Retrieve all products.',
    type: [Product],
  })
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.getAllProducts();
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true, description: 'Product ID' })
  @ApiResponse({
    status: 200,
    description: 'Retrieve a product by ID.',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async getProductById(@Param('id') id: number): Promise<Product> {
    return await this.productService.getProductById(id);
  }

  @Get('type/:id')
  @ApiParam({ name: 'id', required: true, description: 'Product Type ID' })
  @ApiResponse({
    status: 200,
    description: 'Retrieve products by Type ID.',
    type: [Product],
  })
  async getProductsByTypeId(
    @Param('id') productTypeId: number,
  ): Promise<Product[]> {
    return await this.productService.getProductsByTypeId(productTypeId);
  }
}
