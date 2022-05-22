import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TypeAdopts extends BaseSchema {
  protected tableName = 'type_adopts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string("type").notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
