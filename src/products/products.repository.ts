import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
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

  async update(
    updateProductDto: UpdateProductDto,
    productId: number,
    ownerId: number
  ): Promise<Product> {
    const query = this.productRepository.createQueryBuilder('product');
    const result = await query
      .update(Product)
      .set(updateProductDto)
      .where('id = :productId', { productId })
      .andWhere('ownerId = :ownerId', { ownerId })
      .returning('*')
      .execute();
    if (result.affected === 0) {
      throw new BadRequestException(
        `Error updating product with id ${productId}`
      );
    }
    const updateProduct = result.raw[0];
    return updateProduct;
  }

  async delete(productId: number, ownerId: number): Promise<boolean> {
    const result = await this.productRepository.delete({
      id: productId,
      ownerId,
    });
    if (result.affected === 0) {
      return false;
    }
    return true;
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
