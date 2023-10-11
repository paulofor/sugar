import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BaseListComponent } from '../base-component/base-list-component';
import { BabyApi } from '../shared/sdk';

@Component({
  selector: 'app-baby-list',
  templateUrl: './baby-list.component.html',
  styleUrls: ['./baby-list.component.css']
})
export class BabyListComponent extends BaseListComponent {

  constructor(protected dialog: MatDialog, protected srv:BabyApi) { 
    super(dialog,srv)
  }

  /*
  criaItem() {
    return new PerguntaFormulario();
  }

  getComponente() {
    return PerguntaEditaComponent;
  }
  */

 
  getFiltro() {
    return {'include' :  
      { 'relation' : 'tracoBabies' , 'scope' : {
        'order' : 'valorTotal desc' , 'include' : 'tracoPersonalidade'
      } } 
    }
  }
  
  calculaTraco(item) {
    this.srv.CalculaTraco(item.email)
      .subscribe((result) => {
        this.carregaTela();
      })
  }


}
