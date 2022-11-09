import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { ImagemItemCustoUploadComponent } from '../imagem-item-custo-upload/imagem-item-custo-upload.component';
import { ItemCustoEditaComponent } from '../item-custo-edita/item-custo-edita.component';
import { ItemCusto, ItemCustoApi } from '../shared/sdk';

@Component({
  selector: 'app-item-custo-detalhe',
  templateUrl: './item-custo-detalhe.component.html',
  styleUrls: ['./item-custo-detalhe.component.css']
})
export class ItemCustoDetalheComponent implements OnInit {

  itemCusto: ItemCusto;

  constructor(private srv: ItemCustoApi, private router: ActivatedRoute, private dialog : MatDialog) { }

  ngOnInit() {
    this.carregaDetalhe();
  }

  altera() {
    console.log('itemCusto:' , this.itemCusto);
    this.dialog.afterAllClosed.subscribe(result => {
        this.carregaDetalhe();
    });
    this.dialog.open(ItemCustoEditaComponent, {
        width: '800px',
        data: {
          item: this.itemCusto
      }
    });
}

  editaImagem(item : ItemCusto, nomeCampo : string) {
    this.dialog.open(ImagemItemCustoUploadComponent, {
      width: '800px',
      data : {
        item: item,
        nomeCampo : nomeCampo,
        tipo : 'imagem'
      }
    })
  }


  carregaDetalhe() {
    this.router.params.subscribe((params) => {
      let idItem = params['id'];
      this.srv.findById(idItem)
        .subscribe((result: ItemCusto) => {
          console.log('Item Custo: ' , result);
          this.itemCusto = result;
        })
    })
  }
}
