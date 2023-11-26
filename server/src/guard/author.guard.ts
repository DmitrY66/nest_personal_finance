import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException
} from "@nestjs/common";

import { Category } from "src/category/entities/category.entity";
import { CategoryService } from "src/category/category.service";
import { Transaction } from "src/transaction/entities/transaction.entity";
import { TransactionService } from "src/transaction/transaction.service";

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly categoryService: CategoryService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const request = context.switchToHttp().getRequest()
    const { id, type } = request.params;

    let entity: Transaction | Category

    switch (type) {
      case 'transaction':
        entity = await this.transactionService.findOne(id);
        break;

      case 'category':
        entity = await this.categoryService.findOne(id);
        break;

      default:
        throw new NotFoundException('Что-то пошло не так... (autor.guard.ts)');
    }

    const user = request.user;

    if (entity && user && entity.user.id === user.id) {
      return true;
    }

    throw new BadRequestException('Авторство не подтверждено! (autor.guard.ts)');
  }
}
