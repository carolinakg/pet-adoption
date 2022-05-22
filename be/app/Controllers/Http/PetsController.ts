import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Pet from "App/Models/Pet";
import CreateEditPetValidator from "App/Validators/CreateEditPetValidator";
import Drive from "@ioc:Adonis/Core/Drive";
import CreateAdoptValidator from "App/Validators/CreateAdoptValidator";
import Person from "App/Models/Person";
import Database from "@ioc:Adonis/Lucid/Database";
import Adopt from "App/Models/Adopt";
import Favorite from "App/Models/Favorite";

export default class PetsController {
  public async store({ auth, request, response }: HttpContextContract) {
    const userAuth = await auth.use("api").authenticate();
    if (userAuth.type !== "admins") {
      return response.unauthorized();
    }

    const payload = await request.validate(CreateEditPetValidator);
    if (payload.picture) {
      await payload.picture.moveToDisk("./");
    }

    const pet = await Pet.create({
      name: payload.name,
      type: payload.type,
      adoptStatusId: 1,
      picture: payload.picture ? await Drive.getUrl(payload.picture!.fileName!) : null,
      height: payload.height,
      weight: payload.weight,
      color: payload.color,
      bio: payload.bio,
      hypoallergenic: payload.hypoallergenic,
      dietaryRestrictions: payload.dietary_restrictions,
      breed: payload.breed,
    });

    return response.created(pet);
  }
  public async show({ params, response }: HttpContextContract) {
    const pet = await Pet.query().where("id", params.id).preload("adoptStatus");

    return response.ok(pet);
  }
  public async update({
    auth,
    request,
    response,
    params,
  }: HttpContextContract) {
    const userAuth = await auth.use("api").authenticate();
    if (userAuth.type !== "admins") {
      return response.unauthorized();
    }

    const payload = await request.validate(CreateEditPetValidator);

    const pet = await Pet.findOrFail(params.id);

    if (payload.picture) {
      await payload.picture.moveToDisk("./");

      pet.merge({
        picture: payload.picture
          ? await Drive.getUrl(payload.picture!.fileName!)
          : null,
      });
    }

    pet.merge({
      name: payload.name,
      type: payload.type,
      adoptStatusId: payload.adopt_status_id,
      height: payload.height,
      weight: payload.weight,
      color: payload.color,
      bio: payload.bio,
      hypoallergenic: payload.hypoallergenic,
      dietaryRestrictions: payload.dietary_restrictions,
      breed: payload.breed,
    });
    await pet.save();

    return response.ok(pet);
  }

  //index-pegar todas infos
  //busca complexa
  public async index({ request, response }: HttpContextContract) {
    let pets = Pet.query()
      .if(request.input("adopt_status_id"), (builder) => {
        builder.where("adopt_status_id", request.input("adopt_status_id"));
      })
      .if(request.input("type"), (builder) => {
        builder.where("type", "like", `%${request.input("type")}%`);
      })
      .if(request.input("height"), (builder) => {
        builder.where("height", request.input("height"));
      })
      .if(request.input("weight"), (builder) => {
        builder.where("weight", request.input("weight"));
      })
      .if(request.input("name"), (builder) => {
        builder.where("name", "like", `%${request.input("name")}%`);
      });

    return response.ok(await pets.preload("adoptStatus"));
  }
  public async adopt({ auth, request, response, params }: HttpContextContract) {
    const userAuth = await auth.use("api").authenticate();
    const person = await Person.findByOrFail("user_id", userAuth.id);

    const paylod = await request.validate(CreateAdoptValidator);

    // Transaction created
    const trx = await Database.transaction();

    try {
      await Adopt.create({
        petId: Number(params.id),
        personId: person.id,
        typeAdoptId: paylod.type_adopt_id,
      });

      const pet = await Pet.findByOrFail("id", params.id);

      if (paylod.type_adopt_id === 1) {
        pet.merge({ adoptStatusId: 2 });
      } else {
        pet.merge({ adoptStatusId: 3 });
      }

      pet.save();

      // Transaction commited
      await trx.commit();

      return response.ok({
        message: "Pet adopted",
      });
    } catch (error) {
      trx.rollback();
      return response.badRequest(error);
    }
  }

  public async return({ auth, response, params }: HttpContextContract) {
    const userAuth = await auth.use("api").authenticate();
    const person = await Person.findByOrFail("user_id", userAuth.id);

    // Transaction created
    const trx = await Database.transaction();

    const pet = await Pet.findByOrFail("id", params.id);
    if (pet.adoptStatusId === 1) {
      return response.badRequest({
        message: "Pet is not adopted",
      });
    }

    pet.merge({ adoptStatusId: 1 });
    pet.save();

    await Adopt.query()
      .where("person_id", person.id)
      .where("pet_id", params.id)
      .delete();

    // Transaction commited
    await trx.commit();

    return response.ok({
      message: "Pet returned",
    });
  }
  public async save({ auth, response, params }: HttpContextContract) {
    const userAuth = await auth.use("api").authenticate();
    const person = await Person.findByOrFail("user_id", userAuth.id);

    try {
      const favorite = await Favorite.create({
        petId: Number(params.id),
        personId: person.id,
      });

      return response.ok(favorite);
    } catch (error) {
      return response.badRequest(error);
    }
  }
  public async deleteSave({ auth, response, params }: HttpContextContract) {
    const userAuth = await auth.use("api").authenticate();
    const person = await Person.findByOrFail("user_id", userAuth.id);

    try {
      const resp = await Favorite.query()
        .where("person_id", person.id)
        .where("pet_id", params.id)
        .delete();

      if (resp.includes(1)) {
        return response.noContent();
      } else {
        return response.badRequest();
      }
    } catch (error) {
      return response.badRequest(error);
    }
  }
}
