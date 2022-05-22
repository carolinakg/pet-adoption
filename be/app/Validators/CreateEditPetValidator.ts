import { schema, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class CreateEditPetValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    type: schema.string({ trim: true }, [rules.maxLength(255)]),
    name: schema.string({ trim: true }, [rules.maxLength(255)]),
    adopt_status_id: schema.number.optional([
      rules.exists({ table: "adopt_statuses", column: "id" }),
    ]),
    picture: schema.file.nullableAndOptional({
      size: "5mb",
      extnames: ["jpg", "png", "jpeg"],
    }),
    height: schema.number([rules.unsigned()]),
    weight: schema.number([rules.unsigned()]),
    color: schema.string({ trim: true }, [rules.maxLength(255)]),
    bio: schema.string.nullable({ trim: true }, [rules.maxLength(65535)]),
    hypoallergenic: schema.boolean.nullableAndOptional(),
    dietary_restrictions: schema.string.nullable({ trim: true }, [
      rules.maxLength(65535),
    ]),
    breed: schema.string({ trim: true }, [rules.maxLength(255)]),
  });

  public messages = {};
}
