import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Favorite extends BaseModel {
  @column({ isPrimary: true })
  public personId: number;

  @column({ isPrimary: true })
  public petId: number;
  
}
