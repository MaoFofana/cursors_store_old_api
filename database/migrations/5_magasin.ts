import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Categories extends BaseSchema {
  protected tableName = 'magasins'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').nullable()
      table.string('adresse').nullable()
      table.boolean('principale').nullable()
      table.string('description').nullable()
      table.string('image').nullable()
      table
      .integer('user_id')
      .unsigned()
      .references('users.id')
      table
        .integer('gerant_id')
        .unsigned()
        .references('users.id')
      table.timestamps(true, true)

    })
  }
  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('user_id')
    })
    this.schema.dropTable(this.tableName)
  }
}
