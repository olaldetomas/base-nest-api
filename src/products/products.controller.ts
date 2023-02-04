import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { getUserIdFromRequest } from 'src/common/utils/user-request';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Req() req, @Body() createProductDto: CreateProductDto) {
    createProductDto.ownerId = await getUserIdFromRequest(req);
    return this.productsService.create(createProductDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req) {
    const ownerId = await getUserIdFromRequest(req);
    const products = await this.productsService.findAll(ownerId);
    if (!products) {
      throw new NotFoundException('Products not found');
    }
    return products;
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getById(@Req() req, @Param('id') id: number) {
    const ownerId = await getUserIdFromRequest(req);
    const product = await this.productsService.getById(id, ownerId);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }
}
