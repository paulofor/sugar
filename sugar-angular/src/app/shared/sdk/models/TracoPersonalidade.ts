/* tslint:disable */
import {
  PerguntaFormulario
} from '../index';

declare var Object: any;
export interface TracoPersonalidadeInterface {
  "nome"?: string;
  "nomeIngles"?: string;
  "escala"?: string;
  "codigo"?: string;
  "id"?: number;
  perguntaFormularios?: PerguntaFormulario[];
}

export class TracoPersonalidade implements TracoPersonalidadeInterface {
  "nome": string;
  "nomeIngles": string;
  "escala": string;
  "codigo": string;
  "id": number;
  perguntaFormularios: PerguntaFormulario[];
  constructor(data?: TracoPersonalidadeInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `TracoPersonalidade`.
   */
  public static getModelName() {
    return "TracoPersonalidade";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of TracoPersonalidade for dynamic purposes.
  **/
  public static factory(data: TracoPersonalidadeInterface): TracoPersonalidade{
    return new TracoPersonalidade(data);
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
      name: 'TracoPersonalidade',
      plural: 'TracoPersonalidades',
      path: 'TracoPersonalidades',
      idName: 'id',
      properties: {
        "nome": {
          name: 'nome',
          type: 'string'
        },
        "nomeIngles": {
          name: 'nomeIngles',
          type: 'string'
        },
        "escala": {
          name: 'escala',
          type: 'string'
        },
        "codigo": {
          name: 'codigo',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
        perguntaFormularios: {
          name: 'perguntaFormularios',
          type: 'PerguntaFormulario[]',
          model: 'PerguntaFormulario',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'tracoPersonalidadeId'
        },
      }
    }
  }
}
