import { Mock, expect, vi } from 'vitest'
import { Category } from '../../../../internal/categories/core/Category'
import { CategoryRepository } from '../../../../internal/categories/core/CategoryRepository'

export class CategoryRepositoryMock implements CategoryRepository {
  private saveMock: Mock
  private categories: Array<Category> = []
  constructor() {
    this.saveMock = vi.fn()
  }
  async save(category: Category): Promise<void> {
    this.categories.push(category)
    this.saveMock(category)
  }
  assertSaveHaveBeenCalledWithName(expectedName: string): void {
    const saveCalls = this.saveMock.mock.calls
    const wasCalledWithName = saveCalls.some(
      ([category]) => category.name === expectedName
    )
    expect(wasCalledWithName).toBeTruthy()
  }
}
