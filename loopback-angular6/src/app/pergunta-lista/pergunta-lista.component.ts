import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BaseListComponent } from '../base-component/base-list-component';
import { PerguntaEditaComponent } from '../pergunta-edita/pergunta-edita.component';
import { PerguntaFormulario, PerguntaFormularioApi } from '../shared/sdk';

@Component({
  selector: 'app-pergunta-lista',
  templateUrl: './pergunta-lista.component.html',
  styleUrls: ['./pergunta-lista.component.css']
})
export class PerguntaListaComponent extends BaseListComponent {

  constructor(protected dialog: MatDialog, protected srv:PerguntaFormularioApi) { 
    super(dialog,srv)
  }

  criaItem() {
    return new PerguntaFormulario();
  }

  getComponente() {
    return PerguntaEditaComponent;
  }

 
  getFiltro() {
    return {'include' : 'tracoPersonalidade' }
  }
  


}
