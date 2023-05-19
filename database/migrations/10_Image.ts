import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Images extends BaseSchema {
  protected tableName = 'images'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('url').notNullable()
      table
      .integer('product_id')
      .unsigned()
      .references('products.id')
      table.timestamps(true, true)
    })
  }
  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('product_id')
    })
    this.schema.dropTable(this.tableName)
  }
}
