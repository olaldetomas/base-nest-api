import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { getUserIdFromRequest } from 'src/common/utils/user-request';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
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

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Req() req,
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto
  ) {
    const ownerId = await getUserIdFromRequest(req);
    return this.productsService.update(updateProductDto, id, ownerId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Req() req, @Param('id') id: number) {
    const ownerId = await getUserIdFromRequest(req);
    const deleted = await this.productsService.delete(id, ownerId);
    if (!deleted) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return deleted;
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
