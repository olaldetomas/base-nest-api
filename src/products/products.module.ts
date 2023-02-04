import { Product } from 'src/products/entities/product.entity';
import { ProductsRepository } from 'src/products/products.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

@Module({
  controllers: [ProductsController],
  imports: [TypeOrmModule.forFeature([Product])],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
