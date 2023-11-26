import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { Transaction } from './entities/transaction.entity';
import { TransactionService } from './transaction.service';
import { Category } from 'src/category/entities/category.entity';
import { CategoryService } from 'src/category/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Category])],
  controllers: [TransactionController],
  providers: [TransactionService, CategoryService],
})
export class TransactionModule { }
