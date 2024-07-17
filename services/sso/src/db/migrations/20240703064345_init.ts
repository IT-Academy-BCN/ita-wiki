import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user', (table: Knex.TableBuilder) => {
    table.string('id').primary().notNullable()
    table.string('dni', 25).notNullable().unique()
    table.string('email', 255).unique().notNullable()
    table.string('name', 255).notNullable()
    table.string('password', 255).notNullable()
    table
      .enu('role', ['ADMIN', 'REGISTERED', 'MENTOR'], {
        useNative: true,
        enumName: 'user_role',
      })
      .notNullable()
      .defaultTo('REGISTERED')
    table
      .enu('status', ['ACTIVE', 'PENDING', 'BLOCKED'], {
        useNative: true,
        enumName: 'user_status',
      })
      .notNullable()
      .defaultTo('PENDING')
    table.jsonb('user_meta').notNullable().defaultTo('{}')
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now())
    table.timestamp('deleted_at').defaultTo(null)
  })
  await knex.raw(`
    CREATE OR REPLACE FUNCTION trigger_set_timestamp() RETURNS TRIGGER AS $$ 
    BEGIN 
        NEW.updated_at := NOW(); 
        RETURN NEW; 
    END;
    $$ LANGUAGE plpgsql;
  `)

  await knex.raw(`
    CREATE TRIGGER set_timestamp BEFORE UPDATE ON "user"
    FOR EACH ROW EXECUTE FUNCTION trigger_set_timestamp();
  `)
  await knex.schema.createTable('itinerary', (table) => {
    table.text('id').primary()
    table.text('name').unique().notNullable()
    table.text('slug').unique().notNullable()
  })
  await knex.schema.alterTable('user', (table) => {
    table
      .text('itinerary_id')
      .notNullable()
      .references('id')
      .inTable('itinerary')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('user', (table) => {
    table.dropColumn('itinerary_id')
  })
  await knex.schema.dropTableIfExists('itinerary')
  await knex.raw(`DROP TRIGGER IF EXISTS set_timestamp ON "user";`)
  await knex.raw(`DROP FUNCTION IF EXISTS trigger_set_timestamp();`)
  await knex.schema.dropTableIfExists('user')
  await knex.raw(`DROP TYPE IF EXISTS user_role;`)
  await knex.raw(`DROP TYPE IF EXISTS user_status;`)
}
