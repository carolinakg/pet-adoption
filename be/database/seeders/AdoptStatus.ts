import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AdoptStatus from 'App/Models/AdoptStatus';

export default class AdoptStatusSeeder extends BaseSeeder {
  public async run () {
    await AdoptStatus.createMany([
      {
        id: 1,
        status: "Available",
      },
      {
        id: 2,
        status: "Adopted",
      },
      {
        id: 3,
        status: "Fostered",
      },
    ]);
  }
}
