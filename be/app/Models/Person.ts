import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne, ManyToMany, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Pet from 'App/Models/Pet'

export default class Person extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public first_name: string

  @column()
  public last_name: string

  @column()
  public phone: string | null

  @column()
  public bio: string | null

  @column()
  public user_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => User, {
    foreignKey: "id",
  })
  public user: HasOne<typeof User>;

  @manyToMany(() => Pet, {
    pivotTable: "favorites",
  })
  public favorites: ManyToMany<typeof Pet>;

  @manyToMany(() => Pet, {
    pivotTable: "adopts",
    pivotForeignKey: "person_id",
    pivotRelatedForeignKey: "pet_id",
  })
  public adopts: ManyToMany<typeof Pet>;
}
