/* tslint:disable */
import {
  TracoPersonalidade
} from '../index';

declare var Object: any;
export interface TracoBabyInterface {
  "tracoPersonalidadeId"?: number;
  "emailBaby"?: string;
  "valorTotal"?: number;
  tracoPersonalidade?: TracoPersonalidade;
}

export class TracoBaby implements TracoBabyInterface {
  "tracoPersonalidadeId": number;
  "emailBaby": string;
  "valorTotal": number;
  tracoPersonalidade: TracoPersonalidade;
  constructor(data?: TracoBabyInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `TracoBaby`.
   */
  public static getModelName() {
    return "TracoBaby";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of TracoBaby for dynamic purposes.
  **/
  public static factory(data: TracoBabyInterface): TracoBaby{
    return new TracoBaby(data);
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
      name: 'TracoBaby',
      plural: 'TracoBabies',
      path: 'TracoBabies',
      idName: 'tracoPersonalidadeId',
      properties: {
        "tracoPersonalidadeId": {
          name: 'tracoPersonalidadeId',
          type: 'number'
        },
        "emailBaby": {
          name: 'emailBaby',
          type: 'string'
        },
        "valorTotal": {
          name: 'valorTotal',
          type: 'number'
        },
      },
      relations: {
        tracoPersonalidade: {
          name: 'tracoPersonalidade',
          type: 'TracoPersonalidade',
          model: 'TracoPersonalidade',
          relationType: 'belongsTo',
                  keyFrom: 'tracoPersonalidadeId',
          keyTo: 'id'
        },
      }
    }
  }
}
