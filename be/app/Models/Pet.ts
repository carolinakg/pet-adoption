import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon';
import AdoptStatus from 'App/Models/AdoptStatus';
import Adopt from 'App/Models/Adopt';

export default class Pet extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public type: string;

  @column()
  public name: string;

  @column()
  public adoptStatusId: number;

  @column()
  public picture: string | null;

  @column()
  public height: number;

  @column()
  public weight: number;

  @column()
  public color: string;

  @column()
  public bio: string | null;

  @column()
  public hypoallergenic: boolean | null;

  @column()
  public dietaryRestrictions: string | null;

  @column()
  public breed: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  @hasOne(() => AdoptStatus, {
    localKey: "adoptStatusId",
    foreignKey: "id",
  })
  public adoptStatus: HasOne<typeof AdoptStatus>;

  @hasOne(() => Adopt, {})
  public adopt: HasOne<typeof Adopt>;
}
