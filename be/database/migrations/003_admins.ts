import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Admins extends BaseSchema {
  protected tableName = "admins";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE");
      table.timestamps(true, true);
    });
  }
//integer- criou um campo
//resto sao configuracoes do campo
//unsigned- nao pode ser negativo
//notnullable: nao nulo
//references: quem usa meu dado
//intable: nome da tabela qu eesta usando meu dado
//ondelete: delete o filho tambem se deletar o pai
  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
