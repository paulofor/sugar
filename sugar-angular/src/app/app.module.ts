import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { SocketConnection } from './shared/sdk/sockets/socket.connections';
import { SocketDriver } from './shared/sdk/sockets/socket.driver';


import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { SDKBrowserModule, SDKModels, LoopBackAuth, InternalStorage } from './shared/sdk';

import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTableModule} from '@angular/material/table';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatAutocompleteModule, MatCheckbox, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
//import { MatMomentDateModule } from "@angular/material-moment-adapter";
//import { NgxImgModule } from 'ngx-img';
import { FileDropModule } from 'ngx-file-drop';
//import { UploadModule } from './upload/upload.module';
import { ImageUploadModule } from "angular2-image-upload";
import { ReactiveFormsModule } from '@angular/forms';
import { NgDragDropModule } from 'ng-drag-drop';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ProjetoListaComponent } from './projeto-lista/projeto-lista.component';
import { ProjetoEditaComponent } from './projeto-edita/projeto-edita.component';
import { ProjetoDetalheComponent } from './projeto-detalhe/projeto-detalhe.component';
//import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';


registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    ProjetoListaComponent,
    ProjetoEditaComponent,
    ProjetoDetalheComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule ,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    //NgxImgModule.forRoot(),
    FileDropModule,
    //UploadModule,
    ImageUploadModule.forRoot(),
    NgDragDropModule.forRoot(),
    SDKBrowserModule.forRoot(),
    MatExpansionModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatTableModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgApexchartsModule
    //MatMomentDateModule
  ],
  providers: [
    HttpClient, 
    SocketConnection  , 
    SocketDriver,
    SDKModels,
    LoopBackAuth,
    InternalStorage,
    MatNativeDateModule,
    //MatMomentDateModule,
    { provide: LOCALE_ID, useValue: 'pt-BR' } ,
    //{ provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ],
  entryComponents : [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
