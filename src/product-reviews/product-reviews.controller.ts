import { Controller, Get, Param, Delete } from '@nestjs/common';
import { ProductReviewsService } from './product-reviews.service';

@Controller('product-reviews')
export class ProductReviewsController {
  constructor(private readonly productReviewsService: ProductReviewsService) {}

  @Get()
  findAll() {
    return this.productReviewsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productReviewsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productReviewsService.remove(+id);
  }
}
