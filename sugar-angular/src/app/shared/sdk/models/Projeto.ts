/* tslint:disable */

declare var Object: any;
export interface ProjetoInterface {
  "nome"?: string;
  "id"?: number;
}

export class Projeto implements ProjetoInterface {
  "nome": string;
  "id": number;
  constructor(data?: ProjetoInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Projeto`.
   */
  public static getModelName() {
    return "Projeto";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Projeto for dynamic purposes.
  **/
  public static factory(data: ProjetoInterface): Projeto{
    return new Projeto(data);
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
      name: 'Projeto',
      plural: 'Projetos',
      path: 'Projetos',
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
