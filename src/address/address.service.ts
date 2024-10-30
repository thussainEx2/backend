import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const userId = createAddressDto.userId;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const address = this.addressRepository.create({
      ...createAddressDto,
      user,
    });

    return this.addressRepository.save(address);
  }

  async findOne(id: number): Promise<Address> {
    const address = await this.addressRepository.findOneBy({ id });
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    return address;
  }

  async findByUserId(userId: number): Promise<Address[]> {
    return this.addressRepository.find({
      where: { user: { id: userId } }, // Correctly fetch addresses by user ID
    });
  }

  async update(
    id: number,
    userId: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const address = await this.addressRepository.findOneBy({
      id,
      user: { id: userId },
    });

    if (!address) {
      throw new NotFoundException('Address not found for this user');
    }

    console.log('Current address:', address);
    console.log('Update data:', updateAddressDto);

    // Update address fields
    Object.assign(address, updateAddressDto);

    try {
      return await this.addressRepository.save(address);
    } catch (error) {
      console.error('Error saving address:', error);
      throw new InternalServerErrorException('Could not update address');
    }
  }

  async remove(id: number): Promise<void> {
    const address = await this.findOne(id);
    await this.addressRepository.remove(address);
  }
}
