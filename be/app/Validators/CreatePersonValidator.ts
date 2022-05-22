import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePersonValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    //trim tira o espaco
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
        rules.unique({ table: "users", column: "email" }),
      ]),
      password: schema.string({}, [rules.minLength(8), rules.maxLength(180)]),
      password_confirmation: schema.string({}, [rules.confirmed("password")]),
      phone: schema.string.nullable({ trim: true }, [
        rules.mobile({
          locale: ["he-IL"],
        }),
        rules.maxLength(20),
      ]),
      bio: schema.string.nullable({ trim: true }, [rules.maxLength(65535)]),
  })

 
  public messages = {}
}
