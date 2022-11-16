/* tslint:disable */
import {
  PerguntaFormulario
} from '../index';

declare var Object: any;
export interface RespostaFormularioInterface {
  "valorResposta"?: number;
  "babyId"?: number;
  "perguntaFormularioId"?: number;
  perguntaFormulario?: PerguntaFormulario;
}

export class RespostaFormulario implements RespostaFormularioInterface {
  "valorResposta": number;
  "babyId": number;
  "perguntaFormularioId": number;
  perguntaFormulario: PerguntaFormulario;
  constructor(data?: RespostaFormularioInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RespostaFormulario`.
   */
  public static getModelName() {
    return "RespostaFormulario";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RespostaFormulario for dynamic purposes.
  **/
  public static factory(data: RespostaFormularioInterface): RespostaFormulario{
    return new RespostaFormulario(data);
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
      name: 'RespostaFormulario',
      plural: 'RespostaFormularios',
      path: 'RespostaFormularios',
      idName: 'babyId',
      properties: {
        "valorResposta": {
          name: 'valorResposta',
          type: 'number'
        },
        "babyId": {
          name: 'babyId',
          type: 'number'
        },
        "perguntaFormularioId": {
          name: 'perguntaFormularioId',
          type: 'number'
        },
      },
      relations: {
        perguntaFormulario: {
          name: 'perguntaFormulario',
          type: 'PerguntaFormulario',
          model: 'PerguntaFormulario',
          relationType: 'belongsTo',
                  keyFrom: 'perguntaFormularioId',
          keyTo: 'id'
        },
      }
    }
  }
}
