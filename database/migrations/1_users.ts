import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).nullable()
      table.string('password', 180).nullable()
      table.string('remember_me_token').nullable()
      table.string('code_link').notNullable()
      table.string('name').nullable()
      table.string('code').nullable()
      table.boolean('active').defaultTo(false)
      table.string('role').notNullable()
      table.string('adresse').nullable()
      table.string('avatar_url').nullable()
      table.string('phone').nullable()  
      table.string('firebase').nullable()  
      table
      .integer('patron_id')
      .unsigned()
      .references('users.id')
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
