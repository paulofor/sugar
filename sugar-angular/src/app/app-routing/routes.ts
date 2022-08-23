import { Routes } from '@angular/router';


import { HomeComponent } from '../home/home.component';
import { ProjetoDetalheComponent } from '../projeto-detalhe/projeto-detalhe.component';
import { ProjetoListaComponent } from '../projeto-lista/projeto-lista.component';


export const routes : Routes = [
    { path: 'home' , component: HomeComponent },

    { path: 'projetoLista' , component: ProjetoListaComponent },
    { path: 'projetoDetalhe/:id' , component : ProjetoDetalheComponent },

    { path: '',  component: HomeComponent  }
    //{ path: '',          redirectTo: 'home', pathMatch: 'full' }
]