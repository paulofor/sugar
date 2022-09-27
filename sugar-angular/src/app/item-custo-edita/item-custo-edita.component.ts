import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BaseEditComponent } from '../base-component/base-edit-component';
import { ItemCustoApi, ItemCusto } from '../shared/sdk';

@Component({
  selector: 'app-item-custo-edita',
  templateUrl: './item-custo-edita.component.html',
  styleUrls: ['./item-custo-edita.component.css']
})
export class ItemCustoEditaComponent extends BaseEditComponent {

  constructor(protected dialogRef: MatDialogRef<any>
    , @Inject(MAT_DIALOG_DATA) protected data: any, protected servico: ItemCustoApi,
  ) {
    super(dialogRef,data,servico);
  }

  criaItem() {
    let novo = new ItemCusto();
    novo.experienciaId = this.origem.id;
    return novo;
  }

 

}
