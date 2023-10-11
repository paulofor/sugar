import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FileHolder } from 'angular2-image-upload';
import { URL_UPLOAD, URL_IMAGEM } from '../constantes/base.url';
import { ItemCusto, ItemCustoApi } from '../shared/sdk';

@Component({
  selector: 'app-imagem-item-custo-upload',
  templateUrl: './imagem-item-custo-upload.component.html',
  styleUrls: ['./imagem-item-custo-upload.component.css']
})
export class ImagemItemCustoUploadComponent implements OnInit {

  urlUpload = null;

  itemCusto : ItemCusto;
  objetoNovo : any;
  nomeCampo : string;

  constructor(public dialogRef:MatDialogRef<ImagemItemCustoUploadComponent> 
    , @Inject(MAT_DIALOG_DATA) public data: any, private servico: ItemCustoApi) { }

  ngOnInit() {
    console.log('data.item:' , this.data.item);
    console.log('data:' , this.data);
    this.itemCusto = this.data.item;
    this.nomeCampo = this.data.nomeCampo;
    this.urlUpload = URL_UPLOAD + '?nome=itemCusto';
  }

  onUploadFinished(item: FileHolder) {
    let urlImagemServer = URL_IMAGEM + '/' + item.serverResponse.response.body.result.files.image[0].name;;
    console.log('urlImagemServer:', urlImagemServer);
    this.itemCusto[this.nomeCampo] = urlImagemServer;
  }

  onSubmit() {
    this.servico.updateAttributes(this.itemCusto.id, this.itemCusto)
      .subscribe((resultado) => {
        this.dialogRef.close();
      })
  }

}
