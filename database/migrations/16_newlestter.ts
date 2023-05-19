import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PageProducts extends BaseSchema {
  protected tableName = 'new_lestters'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('email')
      table.string('name')
      table.timestamps(true, true)
    })
  }
  public async down () {
    this.schema.dropTable(this.tableName)
  }
}