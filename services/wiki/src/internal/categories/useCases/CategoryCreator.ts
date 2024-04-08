import { Category } from '../core/Category'
import { CategoryRepository } from '../core/CategoryRepository'

export class CategoryCreator {
  constructor(private repository: CategoryRepository) {}
  async run(params: { name: string }): Promise<void> {
    const category = new Category(params.name)
    await this.repository.save(category)
  }
}
