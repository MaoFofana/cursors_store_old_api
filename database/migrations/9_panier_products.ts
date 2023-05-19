import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PanierProducts extends BaseSchema {
  protected tableName = 'panier_products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer("quantite").nullable()
      table.double("price").nullable()
      table.string('name').nullable()
      table.string('image').nullable()
      table
      .integer('order_id')
      .unsigned()
      .references('orders.id')
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
      table.dropForeign('order_id').dropForeign('product_id').dropForeign('user_id')
    })
    this.schema.dropTable(this.tableName)
  }
}
