import { BsModalComponent } from 'ng2-bs3-modal';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cadastro-autor',
  templateUrl: './cadastro-autor.component.html'
})
export class CadastroAutorComponent implements OnInit {

  @ViewChild('modal')
  modal: BsModalComponent;

  constructor() { }

  ngOnInit() {
  }

  abrirModal()  {
    this.modal.open();
  }

}
