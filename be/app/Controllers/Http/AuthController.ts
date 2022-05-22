import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Admin from "App/Models/Admin";
import Person from "App/Models/Person";
import User from "App/Models/User";

export default class AuthController {

  //login
  public async login({ auth, request, response }: HttpContextContract) {
    const email = request.input("email");
    const password = request.input("password");

    try {
      const user = await User.findByOrFail("email", email);
      let expire: string;
      switch (user.type) {
        case "people":
          expire = "30days";
          break;
        case "admins":
          expire = "1days";
          break;
        default:
          expire = "30days";
          break;
      }

      const token = await auth.use("api").attempt(email, password, {
        expiresIn: expire,
        name: user?.serialize().email,
      });
      response.ok(token);
    } catch {
      return response.badRequest("Invalid credentials");
    }
  }

  //logout
  public async logout({ auth, response }: HttpContextContract) {
    try {
      await auth.use("api").revoke();
    } catch {
      return response.unauthorized("No authorization for it");
    }

    return {
      revoked: true,
    };
  }

  //me
  public async me({ auth, response }: HttpContextContract) {
    const userAuth = await auth.use("api").authenticate();
    // return userAuth;
    //token é valido?

    let data;
    switch (userAuth.type) {
      case "people":
        const person = await Person.findBy("user_id", userAuth.id);
        if (person == null) {
          return response.unauthorized("Unauthorized");
        }
        data = {
          id_person: person.id,
          first_name: person.first_name,
          last_name: person.last_name,
          phone: person.phone,
          bio: person.bio,
          email: userAuth.email,
        };
        break;
      case "admins":
        const admin = await Admin.findBy("user_id", userAuth.id);
        if (admin == null) {
          return response.unauthorized("Unauthorized");
        }
        data = {
          id_admin: admin.id,
          email: userAuth.email,
        };
        break;

      default:
        return response.unauthorized("Unauthorized");
    }

    return response.ok(data);
  }
}
