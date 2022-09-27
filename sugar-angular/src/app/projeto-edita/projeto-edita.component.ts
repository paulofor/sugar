import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from '../base-component/base-edit-component';
import { ProjetoApi, Projeto } from '../shared/sdk';

@Component({
  selector: 'app-projeto-edita',
  templateUrl: './projeto-edita.component.html',
  styleUrls: ['./projeto-edita.component.css']
})
export class ProjetoEditaComponent extends BaseEditComponent {

  constructor(protected dialogRef: MatDialogRef<any>
    , @Inject(MAT_DIALOG_DATA) protected data: any, protected servico: ProjetoApi,
  ) {
    super(dialogRef,data,servico);
  }

  criaItem() {
    let novo = new Projeto();
    return novo;
  }

 

}
