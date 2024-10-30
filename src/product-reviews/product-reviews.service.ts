import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductReviewsService {
  findAll() {
    return `This action returns all productReviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} productReview`;
  }
}
