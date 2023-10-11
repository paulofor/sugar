import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from '../base-component/base-edit-component';
import { ExperienciaApi, Experiencia } from '../shared/sdk';

@Component({
  selector: 'app-experiencia-edita',
  templateUrl: './experiencia-edita.component.html',
  styleUrls: ['./experiencia-edita.component.css']
})
export class ExperienciaEditaComponent extends BaseEditComponent {

  constructor(protected dialogRef: MatDialogRef<any>
    , @Inject(MAT_DIALOG_DATA) protected data: any, protected servico: ExperienciaApi,
  ) {
    super(dialogRef,data,servico);
  }

  criaItem() {
    let novo = new Experiencia();
    novo.projetoId = 1;
    return novo;
  }

 

}
