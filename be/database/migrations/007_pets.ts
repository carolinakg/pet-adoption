import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Pets extends BaseSchema {
  protected tableName = "pets";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("type").notNullable(); // dog, cat, etc
      table.string("name").notNullable();
      table
        .integer("adopt_status_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("adopt_statuses");
      table.string("picture").nullable();
      table.integer("height").notNullable(); // em centímetros (cm)
      table.integer("weight").notNullable(); // em centímetros (cm)
      table.string("color").notNullable();
      table.text("bio").nullable();
      table.boolean("hypoallergenic").defaultTo(false);
      table.text("dietary_restrictions").nullable();
      table.string("breed").notNullable(); // raça: Poodle, Siamese, etc
      table.timestamps(true, true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
