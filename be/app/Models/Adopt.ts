import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';
import TypeAdopt from 'App/Models/TypeAdopt';

export default class Adopt extends BaseModel {
  @column({ isPrimary: true })
  public personId: number;

  @column({ isPrimary: true })
  public petId: number;

  @column()
  public typeAdoptId: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @hasOne(() => TypeAdopt, {
    localKey: "typeAdoptId",
    foreignKey: "id",
  })
  public typeAdopt: HasOne<typeof TypeAdopt>;

  
}
