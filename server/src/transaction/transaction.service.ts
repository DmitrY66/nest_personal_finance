import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>
  ) { }

  // добавить трансакцию
  async create(createTransactionDto: CreateTransactionDto, id: number) {
    const newTransaction = {
      title: createTransactionDto.title,
      amount: createTransactionDto.amount,
      type: createTransactionDto.type,
      user: { id: id },
      category: { id: +createTransactionDto.category },
    }

    if (!newTransaction) throw new BadRequestException('Что-то пошло не так...')

    return await this.transactionRepository.save(newTransaction);
  }

  // искать все трансакции и сортировать по дате - новые впереди
  async findAll(id: number) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: { id: id }
      },
      relations: {
        category: true,
      },
      order: {
        createdAt: 'DESC',
      }
    })

    return transactions
  }

  // искать трансакцию по id
  async findOne(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id: id
      },
      relations: {
        user: true,
        category: true,
      }
    })

    if (!transaction) throw new NotFoundException('Трансакция не найдена')

    return transaction;
  }

  // обновить трансакцию по id
  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id: id
      }
    })

    if (!transaction) throw new NotFoundException('Трансакция не найдена')

    return await this.transactionRepository.update(id, updateTransactionDto);
  }

  // удалить трансакцию по id
  async remove(id: number) {
    const transaction = await this.transactionRepository.findOne({
      where: {
        id: id
      }
    })

    if (!transaction) throw new NotFoundException('Трансакция не найдена')

    return await this.transactionRepository.delete(id);
  }

  // пагинация
  async findAllWithPaginatiton(id: number, page: number, limit: number) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: { id: id }
      },
      // relations: {
      //   user: true,
      //   category: true,
      // },
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    })

    return transactions;
  }

  async findAllByType(id: number, type: string) {
    const transactions = await this.transactionRepository.find({
      where: {
        user: { id: id },
        type,
      },
    })

    const total = transactions.reduce((acc, obj) => acc + obj.amount, 0)

    return total
  }
}
