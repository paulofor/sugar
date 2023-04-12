import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseItemComListaComponent } from '../base-component/base-item-com-lista';
import { BabyApi, RespostaFormulario, RespostaFormularioApi, TracoPersonalidade } from '../shared/sdk';

@Component({
  selector: 'app-resposta-baby',
  templateUrl: './resposta-baby.component.html',
  styleUrls: ['./resposta-baby.component.css']
})
export class RespostaBabyComponent extends BaseItemComListaComponent{

  constructor(protected srv:BabyApi, protected router: ActivatedRoute, private srvResposta:RespostaFormularioApi) {
    super(srv,router);
  }

  classeTraco(traco:TracoPersonalidade) {
    if (traco.id==1) return 'traco-1';
    if (traco.id==2) return 'traco-2';
    if (traco.id==3) return 'traco-3';
    if (traco.id==4) return 'traco-4';
    if (traco.id==5) return 'traco-5';
    return '';
  }

  setListaBase(): void {
      let filtro = {
        'where' : {'emailBaby' : this.principal.email },
        'include' : {'relation' : 'perguntaFormulario' , 'scope' : {
          'include' : 'tracoPersonalidade'
        }}
      }
      this.srvResposta.find(filtro)
        .subscribe((result:RespostaFormulario[]) => {
          console.log('listaBase:' , result);
          this.listaBase = result;
        })
  }

}
