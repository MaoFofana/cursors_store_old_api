import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Notifications extends BaseSchema {
  protected tableName = 'notifications'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("title").nullable()
      table.string("message").nullable()
      table.boolean('lu').nullable()
      table
      .integer('user_id')
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
