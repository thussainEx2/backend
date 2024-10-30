import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createCartDto: CreateCartDto): Promise<Cart> {
    const user = await this.userRepository.findOneBy({
      id: createCartDto.userId,
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const product = await this.productRepository.findOneBy({
      id: createCartDto.productId,
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    const cart = this.cartRepository.create({
      user,
      product,
      variantId: createCartDto.variantId,
      quantity: createCartDto.quantity,
      size: createCartDto.size,
    });

    return this.cartRepository.save(cart);
  }

  async fetchCartData(userId: number) {
    return this.cartRepository.find({
      where: { user: { id: userId } },
      relations: ['product', 'product.colors', 'product.colors.sizes'],
    });
  }

  async findOne(id: number) {
    const cart = await this.cartRepository.findOneBy({ id });
    if (!cart) {
      throw new NotFoundException('Cart item not found');
    }
    return cart;
  }

  async update(userId: number, id: number, updateCartDto: UpdateCartDto) {
    const cartItem = await this.cartRepository.findOneBy({
      id,
      user: { id: userId },
    });
    if (!cartItem) {
      throw new NotFoundException('Cart item not found for this user');
    }

    // Update the cart item with new values
    if (updateCartDto.quantity) {
      cartItem.quantity = updateCartDto.quantity;
    }
    if (updateCartDto.size) {
      cartItem.size = updateCartDto.size;
    }
    if (updateCartDto.isPurchased !== undefined) {
      cartItem.isPurchased = updateCartDto.isPurchased;
    }

    return this.cartRepository.save(cartItem);
  }

  async remove(userId: number, prodId: number, variantId: number) {
    const cartItem = await this.cartRepository.findOne({
      where: {
        product: { id: prodId },
        user: { id: userId },
        variantId: variantId,
      },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found for this user');
    }

    return this.cartRepository.remove(cartItem);
  }

  async emptyCart(userId: number) {
    const cartItem = await this.cartRepository.find({
      where: {
        user: { id: userId },
      },
    });

    if (!cartItem) {
      return false;
    }

    await this.cartRepository.remove(cartItem);
    return true;
  }
}
