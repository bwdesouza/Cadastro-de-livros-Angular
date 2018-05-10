import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';

@Component({
  selector: 'app-cadastro-equipe',
  templateUrl: './cadastro-equipe.component.html'
})
export class CadastroEquipeComponent implements OnInit {

  @ViewChild('modal')
  modal: BsModalComponent;

  constructor() { }

  ngOnInit() {
  }

  abrirModal()  {
    this.modal.open();
  }

}
