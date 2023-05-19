import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PageProducts extends BaseSchema {
  protected tableName = 'page_products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.boolean('active').defaultTo(true)
      table
      .integer('product_id')
      .unsigned()
      .references('products.id')
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