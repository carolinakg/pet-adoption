import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class AdoptStatus extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public status: string
}
