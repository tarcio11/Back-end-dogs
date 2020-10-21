import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('photos', (table) => {
    table.increments();
    table.string('nameImg').notNullable();
    table.integer('size').notNullable();
    table.string('key').notNullable();
    table.integer('post_id').notNullable().references('id').inTable('posts');
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('photos');
}
