import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Products extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
       table.string('sluk').notNullable()
      table.string('code').nullable()
      table.integer('seuil').notNullable()
      table.text('description').nullable()
      table.string('unite').nullable()
      table.double('price').notNullable()
      table.double('sale_price').notNullable()
      table.integer('quantity').nullable()
      table.boolean('active').defaultTo(true)
      table.integer("weight").nullable()
      table.integer('reduction').nullable()
      table
      .integer('categorie_id')
      .unsigned()
      .references('categories.id')
      table
      .integer('magasin_id')
      .unsigned()
      .references('magasins.id')
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
