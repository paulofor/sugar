/* tslint:disable */

declare var Object: any;
export interface ExperienciaInterface {
  "nome"?: string;
  "id"?: number;
}

export class Experiencia implements ExperienciaInterface {
  "nome": string;
  "id": number;
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
