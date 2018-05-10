import { BsModalComponent } from 'ng2-bs3-modal';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-visualizar-capa',
  templateUrl: './visualizar-capa.component.html'
})
export class VisualizarCapaComponent implements OnInit {

  @ViewChild('modal')
  modal: BsModalComponent;

  imagem: string;

  constructor() { }

  ngOnInit() {
  }

  abrirModal(img: string)  {
    this.carregaImagem(img);
    this.modal.open();
  }
  
  carregaImagem(img: string) {
    if (img != "" && img != null && img != 'null'){
      if(img.split('/')[0] == 'data:image')
        this.imagem = img;
      else
        this.imagem = "data:image/jpeg;base64," + img;
    }
    else
      this.imagem = "../assets/imagem/empyt.png";
  }
}
