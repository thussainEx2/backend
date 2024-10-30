import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  private readonly logger = new Logger(CartController.name);

  constructor(private readonly cartService: CartService) {}
  @ApiProperty()
  @Post('create')
  async addToCart(@Body() createCartDto: CreateCartDto) {
    console.log(createCartDto);
    this.logger.log('Adding item to cart', JSON.stringify(createCartDto));
    return this.cartService.create(createCartDto);
  }

  @ApiProperty()
  @Get('userId/:userId')
  async fetchCartData(@Param('userId') userId: string) {
    return this.cartService.fetchCartData(+userId);
  }

  @ApiProperty()
  @Patch('userId/:userId/itemId/:itemId')
  async updateCart(
    @Param('userId') userId: string,
    @Param('itemId') itemId: string,
    @Body() updateCartDto: UpdateCartDto,
  ) {
    return this.cartService.update(+userId, +itemId, updateCartDto);
  }

  @ApiProperty()
  @Delete('userId/:userId/prodId/:prodId/variantId/:variantId')
  async remove(
    @Param('userId') userId: string,
    @Param('prodId') prodId: string,
    @Param('variantId') variantId: string,
  ) {
    return this.cartService.remove(+userId, +prodId, +variantId);
  }

  @ApiProperty()
  @Delete('userId/:userId')
  async emptyCart(@Param('userId') userId: string): Promise<boolean> {
    return this.cartService.emptyCart(+userId);
  }
}
