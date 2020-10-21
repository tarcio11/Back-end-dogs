import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('comments', (table) => {
    table.increments();
    table.string('comment').notNullable();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.integer('photo_id').notNullable().references('id').inTable('photos');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('comments');
}
