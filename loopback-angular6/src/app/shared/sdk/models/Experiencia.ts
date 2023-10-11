/* tslint:disable */
import {
  Projeto,
  ItemCusto
} from '../index';

declare var Object: any;
export interface ExperienciaInterface {
  "nome"?: string;
  "valor"?: number;
  "id"?: number;
  "projetoId"?: number;
  projeto?: Projeto;
  itemCustos?: ItemCusto[];
}

export class Experiencia implements ExperienciaInterface {
  "nome": string;
  "valor": number;
  "id": number;
  "projetoId": number;
  projeto: Projeto;
  itemCustos: ItemCusto[];
  constructor(data?: ExperienciaInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Experiencia`.
   */
  public static getModelName() {
    return "Experiencia";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Experiencia for dynamic purposes.
  **/
  public static factory(data: ExperienciaInterface): Experiencia{
    return new Experiencia(data);
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
      name: 'Experiencia',
      plural: 'Experiencia',
      path: 'Experiencia',
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
        "projetoId": {
          name: 'projetoId',
          type: 'number'
        },
      },
      relations: {
        projeto: {
          name: 'projeto',
          type: 'Projeto',
          model: 'Projeto',
          relationType: 'belongsTo',
                  keyFrom: 'projetoId',
          keyTo: 'id'
        },
        itemCustos: {
          name: 'itemCustos',
          type: 'ItemCusto[]',
          model: 'ItemCusto',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'experienciaId'
        },
      }
    }
  }
}
