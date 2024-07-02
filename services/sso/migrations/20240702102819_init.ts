import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user', (table) => {
    table.string('id').primary(),
      table.string('dni', 25).notNullable(),
      table.string('email', 255).unique().notNullable(),
      table.string('name', 255).notNullable(),
      table.string('password', 255).notNullable(),
      table.string('role', 255).notNullable().defaultTo('REGISTERED'),
      table.string('status', 255).notNullable().defaultTo('PENDING'),
      table.timestamp('created_at').defaultTo(knex.fn.now()),
      table.timestamp('updated_at').defaultTo(knex.fn.now()),
      table.timestamp('deleted_at').defaultTo(knex.fn.now()).notNullable()
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user')
}
