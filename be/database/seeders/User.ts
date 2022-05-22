import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Admin from 'App/Models/Admin';
import Person from 'App/Models/Person';
import User from 'App/Models/User';

export default class UserSeeder extends BaseSeeder {
  public async run() {
    let user = await User.create({
      email: "person@email.com",
      password: "123456",
      type: "people",
    });

    await Person.create({
      user_id: user.id,
      first_name: "carolina",
      last_name: "ghelman",
      phone: "0533030711",
      bio: "oii",
    });

    user = await User.create({
      email: "admin@email.com",
      password: "123456",
      type: "admins",
    });

    await Admin.create({
      user_id: user.id,
    });
  }
}
