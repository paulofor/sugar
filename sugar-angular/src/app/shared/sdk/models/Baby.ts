/* tslint:disable */
import {
  RespostaFormulario
} from '../index';

declare var Object: any;
export interface BabyInterface {
  "email"?: string;
  "nomeApelido"?: string;
  "peso"?: string;
  "altura"?: string;
  "id"?: number;
  respostaFormularios?: RespostaFormulario[];
}

export class Baby implements BabyInterface {
  "email": string;
  "nomeApelido": string;
  "peso": string;
  "altura": string;
  "id": number;
  respostaFormularios: RespostaFormulario[];
  constructor(data?: BabyInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Baby`.
   */
  public static getModelName() {
    return "Baby";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Baby for dynamic purposes.
  **/
  public static factory(data: BabyInterface): Baby{
    return new Baby(data);
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
      name: 'Baby',
      plural: 'Babies',
      path: 'Babies',
      idName: 'id',
      properties: {
        "email": {
          name: 'email',
          type: 'string'
        },
        "nomeApelido": {
          name: 'nomeApelido',
          type: 'string'
        },
        "peso": {
          name: 'peso',
          type: 'string'
        },
        "altura": {
          name: 'altura',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        respostaFormularios: {
          name: 'respostaFormularios',
          type: 'RespostaFormulario[]',
          model: 'RespostaFormulario',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'babyId'
        },
      }
    }
  }
}
