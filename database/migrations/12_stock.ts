import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Stocks extends BaseSchema {
  protected tableName = 'stocks'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('quantity_entree').nullable()
      table.integer('quantity_sortie').nullable() 
      table.integer('quantity').nullable()
      table.string('motif')
      table.double('prix').nullable()
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
      table.dropForeign('product_id')
    })
    this.schema.dropTable(this.tableName)
  }
}
