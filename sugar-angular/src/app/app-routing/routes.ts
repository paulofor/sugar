import { Routes } from '@angular/router';
import { BabyListComponent } from '../baby-list/baby-list.component';
import { ExperienciaListaComponent } from '../experiencia-lista/experiencia-lista.component';


import { HomeComponent } from '../home/home.component';
import { ItemCustoDetalheComponent } from '../item-custo-detalhe/item-custo-detalhe.component';
import { PerguntaListaComponent } from '../pergunta-lista/pergunta-lista.component';
import { ProjetoDetalheComponent } from '../projeto-detalhe/projeto-detalhe.component';
import { ProjetoListaComponent } from '../projeto-lista/projeto-lista.component';
import { RespostaBabyComponent } from '../resposta-baby/resposta-baby.component';


export const routes : Routes = [
    { path: 'home' , component: HomeComponent },

    { path: 'projetoLista' , component: ProjetoListaComponent },
    { path: 'projetoDetalhe/:id' , component : ProjetoDetalheComponent },

    { path: 'experienciaLista/:idProjeto' , component : ExperienciaListaComponent },
    { path: 'itemCustoDetalhe/:id' , component: ItemCustoDetalheComponent },
    { path: 'perguntaLista' , component: PerguntaListaComponent },
 
    { path: 'babyLista' , component: BabyListComponent },
    { path: 'respostaBaby/:id' , component: RespostaBabyComponent },

    { path: '',  component: HomeComponent  }
    //{ path: '',          redirectTo: 'home', pathMatch: 'full' }
]