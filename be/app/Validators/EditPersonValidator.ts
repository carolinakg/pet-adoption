import { schema, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class EditPersonValidator {
  constructor(protected ctx: HttpContextContract) {}

  public refs = schema.refs({
    user_id: this.ctx.auth.user!.id,
  });

  
  public schema = schema.create({
    first_name: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    last_name: schema.string({ trim: true }, [
      rules.minLength(3),
      rules.maxLength(255),
    ]),
    email: schema.string({ trim: true }, [
      rules.email(),
      rules.maxLength(255),
      rules.unique({
        table: "users",
        column: "email",
        whereNot: { id: this.refs.user_id },
      }),
    ]),
    password: schema.string.nullableAndOptional({}, [
      rules.minLength(8),
      rules.maxLength(180),
    ]),
    phone: schema.string.nullable({ trim: true }, [
      rules.mobile({
        locale: ["he-IL"],
      }),
      rules.maxLength(20),
    ]),
    bio: schema.string.nullable({ trim: true }, [rules.maxLength(65535)]),
  });

  public messages = {};
}
