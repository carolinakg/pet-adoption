import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class People extends BaseSchema {
  protected tableName = "people";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
        table.string('first_name').notNullable()
        table.string('last_name').notNullable()
        table.string('phone', 20).nullable()
        table.text('bio').nullable()

        table.timestamps(true,true)
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
