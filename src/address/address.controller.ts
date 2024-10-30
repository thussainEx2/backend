import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  async create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.addressService.findOne(+id);
  }

  @Get('user/:userId')
  async findByUserId(@Param('userId') userId: string) {
    return this.addressService.findByUserId(+userId);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('userId') userId: number,
    @Body() updateAddressDto: UpdateAddressDto,
  ) {
    const numericId = Number(id);

    const dtoWithId = {
      ...updateAddressDto,
      id: numericId,
    };

    return this.addressService.update(numericId, userId, dtoWithId);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.addressService.remove(+id);
  }
}
