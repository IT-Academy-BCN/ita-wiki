import { PrismaClient } from '@prisma/client'
import { Category } from '../../core/Category'
import { CategoryRepository } from '../../core/CategoryRepository'

export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private client: PrismaClient) {}
  async save(category: Category): Promise<void> {
    await this.client.category.create({ data: category.toPrimitives() })
  }
}
