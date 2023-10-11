import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { BaseListComponent } from '../base-component/base-list-component';
import { ProjetoEditaComponent } from '../projeto-edita/projeto-edita.component';
import { Projeto } from '../shared/sdk';
import { ProjetoApi } from '../shared/sdk/services/custom/Projeto';

@Component({
  selector: 'app-projeto-lista',
  templateUrl: './projeto-lista.component.html',
  styleUrls: ['./projeto-lista.component.css']
})
export class ProjetoListaComponent extends BaseListComponent {

  constructor(protected dialog: MatDialog, protected srv:ProjetoApi,public router: Router) { 
    super(dialog,srv)
  }

  criaItem() {
    return new Projeto();
  }

  getComponente() {
    return ProjetoEditaComponent;
  }

 

  


}
