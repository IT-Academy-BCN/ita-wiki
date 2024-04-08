import { describe, it } from 'vitest'
import { CategoryRepositoryMock } from '../__mock__/CategoryRepositoryMock'
import { CategoryCreator } from '../../../../internal/categories/useCases/CategoryCreator'
import { Category } from '../../../../internal/categories/core/Category'

describe('CategoryCreator', () => {
  it('creates a category', async () => {
    const category = new Category('name')

    const repository = new CategoryRepositoryMock()
    const useCase = new CategoryCreator(repository)

    await useCase.run({ name: category.name })

    repository.assertSaveHaveBeenCalledWithName(category.name)
  })
})
