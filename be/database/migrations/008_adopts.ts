import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Adopts extends BaseSchema {
  protected tableName = "adopts";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table
        .integer("person_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("people");
      table
        .integer("pet_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("pets");
      table
        .integer("type_adopt_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("type_adopts");
      table.timestamp("created_at");

      table.primary(["person_id", "pet_id"]);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
