import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Favorites extends BaseSchema {
  protected tableName = "favorites";

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

      table.primary(["person_id", "pet_id"]);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
