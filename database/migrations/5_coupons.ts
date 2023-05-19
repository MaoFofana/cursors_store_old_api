import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Coupons extends BaseSchema {
  protected tableName = 'coupons'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("code").nullable()
      table.double("reduction").nullable()
      table.dateTime("start").nullable()
      table.dateTime("end").nullable()
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
