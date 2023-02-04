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

  // update(id: number, updateProductDto: UpdateProductDto) {
  //   return `This action updates a #${id} product`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} product`;
  // }
}
