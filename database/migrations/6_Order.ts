import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Orders extends BaseSchema {
  protected tableName = 'orders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('number').notNullable()
      table.double('avance').nullable()
      table.double('reste').nullable()

      table.string('status').notNullable()
      table.string('lieu').notNullable()
      table.string('client_name').notNullable()
      table.string('client_number').notNullable()
      table.double('discount_total').notNullable()
      table.double('shipping_total').notNullable()
      table.double('total').notNullable()
      table
      .integer('user_id')
      .unsigned()
      .references('users.id')
      table
      .integer('livreur_id')
      .unsigned()
      .references('users.id')
      table.timestamps(true, true)
    })
  }
  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('user_id').dropForeign('livreur_id')
    })
    this.schema.dropTable(this.tableName)
  }
}
