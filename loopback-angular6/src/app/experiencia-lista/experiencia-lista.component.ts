import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { BaseListComponent } from '../base-component/base-list-component';
import { ExperienciaEditaComponent } from '../experiencia-edita/experiencia-edita.component';
import { ItemCustoEditaComponent } from '../item-custo-edita/item-custo-edita.component';
import { Experiencia, ExperienciaApi } from '../shared/sdk';

@Component({
  selector: 'app-experiencia-lista',
  templateUrl: './experiencia-lista.component.html',
  styleUrls: ['./experiencia-lista.component.css']
})
export class ExperienciaListaComponent extends BaseListComponent {

  valorExperiencia: number;

  constructor(protected dialog: MatDialog, protected srv:ExperienciaApi,public router: Router) { 
    super(dialog,srv)
  }

  getFiltro() {
    return {
        'include' : 'itemCustos'
      };
  }

  criaItem() {
    let experiencia = new Experiencia();
    experiencia.projetoId = 1;
    return experiencia;
  }

  getComponente() {
    return ExperienciaEditaComponent;
  }

 
  getDialogo1() {
    return ItemCustoEditaComponent;
  }
  


}
