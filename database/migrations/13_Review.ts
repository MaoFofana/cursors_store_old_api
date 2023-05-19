import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Reviews extends BaseSchema {
  protected tableName = 'reviews'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.boolean('status').nullable()
      table.string('name').nullable()
      table.string('title').nullable()
      table.string('image_link').nullable()
      table.string('reviews').nullable()
      table.integer('rating').nullable()
      table.integer('product_id').unsigned()
      table.foreign("product_id").references('id').inTable('products')
      table.integer('user_id').unsigned()
      table.foreign("user_id").references('id').inTable('users')
     table.timestamps(true, true)
    })
  }
  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign('product_id').dropForeign('blog_id').dropForeign('podcast_chapter_id')
      .dropForeign('user_id')
    })
    this.schema.dropTable(this.tableName)
  }
}
