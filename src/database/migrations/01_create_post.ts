import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('posts', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.integer('weight').notNullable();
    table.integer('age').notNullable();
    table.integer('access').notNullable();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table
      .string('user_username')
      .notNullable()
      .references('username')
      .inTable('users');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('posts');
}
