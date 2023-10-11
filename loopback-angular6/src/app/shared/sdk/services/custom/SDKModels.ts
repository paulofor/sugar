/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Projeto } from '../../models/Projeto';
import { Experiencia } from '../../models/Experiencia';
import { ItemCusto } from '../../models/ItemCusto';
import { Container } from '../../models/Container';
import { PerguntaFormulario } from '../../models/PerguntaFormulario';
import { Baby } from '../../models/Baby';
import { RespostaFormulario } from '../../models/RespostaFormulario';
import { TracoPersonalidade } from '../../models/TracoPersonalidade';
import { TracoBaby } from '../../models/TracoBaby';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Projeto: Projeto,
    Experiencia: Experiencia,
    ItemCusto: ItemCusto,
    Container: Container,
    PerguntaFormulario: PerguntaFormulario,
    Baby: Baby,
    RespostaFormulario: RespostaFormulario,
    TracoPersonalidade: TracoPersonalidade,
    TracoBaby: TracoBaby,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
