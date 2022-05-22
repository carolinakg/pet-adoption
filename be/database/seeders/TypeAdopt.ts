import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import TypeAdopt from 'App/Models/TypeAdopt';

export default class TypeAdoptSeeder extends BaseSeeder {
  public async run () {
    await TypeAdopt.createMany([
      {
        id: 1,
        type: "Adopt",
      },
      {
        id: 2,
        type: "Foster",
      },
    ]);
  }
}
