/* tslint:disable */

declare var Object: any;
export interface PerguntaFormularioInterface {
  "texto"?: string;
  "id"?: number;
}

export class PerguntaFormulario implements PerguntaFormularioInterface {
  "texto": string;
  "id": number;
  constructor(data?: PerguntaFormularioInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `PerguntaFormulario`.
   */
  public static getModelName() {
    return "PerguntaFormulario";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of PerguntaFormulario for dynamic purposes.
  **/
  public static factory(data: PerguntaFormularioInterface): PerguntaFormulario{
    return new PerguntaFormulario(data);
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
      name: 'PerguntaFormulario',
      plural: 'PerguntaFormularios',
      path: 'PerguntaFormularios',
      idName: 'id',
      properties: {
        "texto": {
          name: 'texto',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
