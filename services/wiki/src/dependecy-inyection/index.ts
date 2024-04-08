import { ContainerBuilder, Reference } from 'node-dependency-injection'
import { prisma } from '../prisma/client'
import { PrismaCategoryRepository } from '../internal/categories/io/persistence/PrismaCategoryRepository'
import { CategoryCreator } from '../internal/categories/useCases/CategoryCreator'

const container = new ContainerBuilder()

// Repositories
container
  .register('prismaCategoryRepository', PrismaCategoryRepository)
  .addArgument(prisma)

// Use cases
container
  .register('categoryCreator', CategoryCreator)
  .addArgument(new Reference('prismaCategoryRepository'))

export default container
