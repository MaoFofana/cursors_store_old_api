import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Unites extends BaseSchema {
  protected tableName = 'unites'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table
      .integer('user_id')
      .unsigned()
      .references('users.id')
      table.timestamps(true, true)
    })
  }
  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
