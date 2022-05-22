import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
// import Admin from "App/Models/Admin";
import Person from "App/Models/Person";
import User from "App/Models/User";
import CreatePersonValidator from "App/Validators/CreatePersonValidator";
import EditPersonValidator from "App/Validators/EditPersonValidator";

export default class PeopleController {
  //signup
  public async signup({ request, response }: HttpContextContract) {
    const payload = await request.validate(CreatePersonValidator);

    const user = await User.create({
      email: payload.email,
      password: payload.password,
    });

    const person = await Person.create({
      user_id: user.id,
      first_name: payload.first_name,
      last_name: payload.last_name,
      phone: payload.phone,
      bio: payload.bio,
    });

    return response.created({
      id: person.id,
      email: user.email,
      first_name: person.first_name,
      last_name: person.last_name,
      phone: person.phone,
      bio: person.bio,
    });
  }

  //userPet
  public async userPets({ response, params }: HttpContextContract) {
    //query- selecionar coisa do banco de dados
    //esse é select
    const person = await Person.query()
      .where("id", params.id)
      .preload("user")
      .preload("favorites", (queryAdopt) => {
        queryAdopt
          .preload("adopt", (query) => {
            query.preload("typeAdopt");
          })
          .preload("adoptStatus");
      })
      .preload("adopts", (queryAdopt) => {
        queryAdopt
          .preload("adopt", (query) => {
            query.preload("typeAdopt");
          })
          .preload("adoptStatus");
      })
      .first();

    if (!person) {
      return response.notFound();
    }

    const respClean = {
      id: person.id,
      first_name: person.first_name,
      last_name: person.last_name,
      phone: person.phone,
      bio: person.bio,
      email: person.user.email,
      favorites: person.favorites,
      adopts: person.adopts,
    };

    return response.ok(respClean);
  }

  public async show({ response, params }: HttpContextContract) {
    const person = await Person.query()
      .where("id", params.id)
      .preload("user")
      .first();

    if (!person) {
      return response.notFound();
    }

    return response.ok({
      id: person.id,
      first_name: person.first_name,
      lastname: person.last_name,
      phone: person.phone,
      bio: person.bio,
      email: person.user.email,
    });
  }

  public async update({ auth, request, response }: HttpContextContract) {
    const payload = await request.validate(EditPersonValidator);
    const userAuth = await auth.use("api").authenticate();

    // Transaction created
    const trx = await Database.transaction();
    //atualizar no banco de dados. envolve mais de uma tabela

    try {
      const user = await User.findByOrFail("id", userAuth.id);
      const person = await Person.findByOrFail("user_id", userAuth.id);

      if (payload.password) {
        user.merge({ email: payload.email, password: payload.password });
      } else {
        user.merge({ email: payload.email });
      }
      await user.save();

      person.merge({
        first_name: payload.first_name,
        last_name: payload.last_name,
        phone: payload.phone,
        bio: payload.bio,
      });
      await person.save();
      // Transaction commited
      await trx.commit();
      //subir no banco. fechar infos

      return response.ok({
        id: person.id,
        first_name: person.first_name,
        lastname: person.last_name,
        phone: person.phone,
        bio: person.bio,
        email: user.email,
      });
    } catch (error) {
      await trx.rollback();
      return response.badRequest("Something in the request is wrong");
    }
  }
  public async index({ auth, response }: HttpContextContract) {
    const userAuth = await auth.use("api").authenticate();
    if (userAuth.type !== "admins") {
      return response.unauthorized();
    }

    const people = await Person.query().preload("user");

    return response.ok(people);
  }

  public async showFull({ response, params }: HttpContextContract) {
    const person = await Person.query()
      .where("id", params.id)
      .preload("user")
      .preload("favorites")
      .preload("adopts", (queryAdopt) => {
        queryAdopt
          .preload("adopt", (query) => {
            query.preload("typeAdopt");
          })
          .preload("adoptStatus");
      });

    return response.ok(person);
  }

  // public async makeAdmin({ auth, response, params }: HttpContextContract) {
  //   const userAuth = await auth.use("api").authenticate();
  //   if (userAuth.type !== "admins") {
  //     return response.unauthorized();
  //   }

  //   const user = await User.findByOrFail("id", params.id);
  //   if (user.type == "people") {
  //     user.merge({ type: "admins" });
  //     await user.save();

  //     await Person.query().where("user_id", params.id).delete();
  //     await Admin.create({
  //       user_id: params.id,
  //     });

  //     return response.ok({
  //       message: "User now is an admin",
  //     });
  //   } else {
  //     return response.ok({
  //       message: "User already is an admin",
  //     });
  //   }
  // }

}
