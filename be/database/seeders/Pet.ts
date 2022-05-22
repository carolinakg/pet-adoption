import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Pet from 'App/Models/Pet';

export default class PetSeeder extends BaseSeeder {
  public async run () {
    await Pet.createMany([
      {
        id: 1,
        name: "Puppy",
        type: "Dog",
        adoptStatusId: 1,
        height: 10,
        weight: 10,
        color: "Black",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing eli",
        hypoallergenic: false,
        dietaryRestrictions: "Lorem ipsum dolor sit amet, consectetur ",
        breed: "pug",
      },
      {
        id: 2,
        name: "Garfield",
        type: "Cat",
        adoptStatusId: 1,
        height: 20,
        weight: 20,
        color: "White",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing eli",
        hypoallergenic: true,
        dietaryRestrictions: "Lorem ipsum dolor sit amet, consectetur ",
        breed: "semi-long-hair",
      },
    ]);
  }
}
