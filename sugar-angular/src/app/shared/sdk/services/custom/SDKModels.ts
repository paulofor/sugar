/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Projeto } from '../../models/Projeto';
import { Experiencia } from '../../models/Experiencia';
import { ItemCusto } from '../../models/ItemCusto';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Projeto: Projeto,
    Experiencia: Experiencia,
    ItemCusto: ItemCusto,
    
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
