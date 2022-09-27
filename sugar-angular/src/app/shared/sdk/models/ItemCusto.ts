/* tslint:disable */

declare var Object: any;
export interface ItemCustoInterface {
  "nome"?: string;
  "valor"?: number;
  "id"?: number;
  "experienciaId"?: number;
}

export class ItemCusto implements ItemCustoInterface {
  "nome": string;
  "valor": number;
  "id": number;
  "experienciaId": number;
  constructor(data?: ItemCustoInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `ItemCusto`.
   */
  public static getModelName() {
    return "ItemCusto";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of ItemCusto for dynamic purposes.
  **/
  public static factory(data: ItemCustoInterface): ItemCusto{
    return new ItemCusto(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'ItemCusto',
      plural: 'ItemCustos',
      path: 'ItemCustos',
      idName: 'id',
      properties: {
        "nome": {
          name: 'nome',
          type: 'string'
        },
        "valor": {
          name: 'valor',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "experienciaId": {
          name: 'experienciaId',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
