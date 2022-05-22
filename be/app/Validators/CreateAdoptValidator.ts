import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateAdoptValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    type_adopt_id: schema.number([
      rules.exists({ table: "type_adopts", column: "id" }),
    ]),
  })

  public messages = {}
}
