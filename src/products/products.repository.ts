import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const productEntity = this.productRepository.create(createProductDto);
    return await this.productRepository.save(productEntity);
  }

  async getById(productId: number, ownerId: number): Promise<Product | null> {
    return await this.productRepository.findOneBy({ id: productId, ownerId });
  }

  async findAll(ownerId: number): Promise<Product[]> {
    return await this.productRepository.find({
      where: { ownerId },
      relations: ['owner'],
    });
  }
}
