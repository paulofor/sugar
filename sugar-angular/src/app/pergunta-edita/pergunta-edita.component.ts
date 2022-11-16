import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from '../base-component/base-edit-component';
import { PerguntaFormulario, PerguntaFormularioApi } from '../shared/sdk';

@Component({
  selector: 'app-pergunta-edita',
  templateUrl: './pergunta-edita.component.html',
  styleUrls: ['./pergunta-edita.component.css']
})
export class PerguntaEditaComponent extends BaseEditComponent {

  constructor(protected dialogRef: MatDialogRef<any>
    , @Inject(MAT_DIALOG_DATA) protected data: any, protected servico: PerguntaFormularioApi,
  ) {
    super(dialogRef,data,servico);
  }

  criaItem() {
    let novo = new PerguntaFormulario();
    return novo;
  }

 

}
