import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { ProductsRepository } from 'src/products/products.repository';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productsRepository.create(createProductDto);
  }

  async findAll(ownerId: number) {
    return await this.productsRepository.findAll(ownerId);
  }

  async getById(productId: number, ownerId: number) {
    return await this.productsRepository.getById(productId, ownerId);
  }

  async update(
    updateProductDto: UpdateProductDto,
    productId: number,
    ownerId: number
  ) {
    return await this.productsRepository.update(
      updateProductDto,
      productId,
      ownerId
    );
  }

  async delete(productId: number, ownerId: number) {
    return await this.productsRepository.delete(productId, ownerId);
  }
}
