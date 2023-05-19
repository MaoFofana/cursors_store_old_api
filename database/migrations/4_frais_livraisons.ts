import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FraisLivraisons extends BaseSchema {
  protected tableName = 'frais_livraisons'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('lieu').notNullable()
      table.double('price').notNullable()
      table.double('min').nullable()
      table.double('max').nullable()
      table.boolean('status').nullable()
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
