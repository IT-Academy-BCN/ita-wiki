import { createId } from '@paralleldrive/cuid2'
import slugify from 'slugify'

export class Category {
  readonly id: string
  readonly name: string
  readonly slug: string
  constructor(name: string) {
    this.id = createId()
    this.name = name
    this.slug = slugify(name, { lower: true })
  }
  toPrimitives(): any {
    return { id: this.id, name: this.name, slug: this.slug }
  }
}
