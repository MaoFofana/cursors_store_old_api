import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Categories extends BaseSchema {
  protected tableName = 'categories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('description').nullable()
      table.string('image').nullable()
      table
      .integer('categorie_id')
      .unsigned()
      .references('categories.id')
      table
      .integer('user_id')
      .unsigned()
      .references('users.id')
      table.timestamps(true, true)
    })
  }
  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('categorie_id')
    })
    this.schema.dropTable(this.tableName)
  }
}
