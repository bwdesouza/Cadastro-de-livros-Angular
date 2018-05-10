import { BsModalComponent } from 'ng2-bs3-modal';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { Categoria } from '../../view-models/categoria';

import swal from 'sweetalert2'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';

const SWALL_TYPE_TITLE = 'Cadastro de categoria';
const SWALL_TYPE_POSITION = 'top-right';
const SWALL_TYPE_SUCCESS = 'success';
const SWALL_TYPE_ERROR = 'error';
const SWALL_MESSAGE_SUCESSO = 'Categoria foi cadastrada com sucesso!';
const SWALL_MESSAGE_ERRO = 'Por favor tente novamente ou contate a equipe técnica!';

@Component({
  selector: 'app-cadastro-categoria',
  templateUrl: './cadastro-categoria.component.html',
  providers: [CategoriaService]
})

export class CadastroCategoriaComponent implements OnInit {
  @Output() categoriaUpdated = new EventEmitter();
  @ViewChild('modal')
  modal: BsModalComponent;
  livroDigitalGroupCategoria: FormGroup;
  categoriaCommand: any;

  constructor(private categoriaService: CategoriaService,
    private fb: FormBuilder) {

  }

  ngOnInit() {
    this.carregaFormulario();
  }

  resetForm() {
    if (this.livroDigitalGroupCategoria != undefined) {
      this.livroDigitalGroupCategoria.reset({ descricao: "" });
    }
    this.categoriaCommand = { Descricao: "" };
  }

  carregaFormulario() {
    this.resetForm();
    this.livroDigitalGroupCategoria = this.fb.group({
      descricao: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  abrirModal() {
    this.modal.open();
  }

  fecharModal() {
    this.resetForm();
    this.modal.close();
  }

  Cadastrar() {
    this.categoriaCommand.Descricao = this.livroDigitalGroupCategoria.value['descricao'];
    if (this.categoriaCommand.Descricao != '' && this.categoriaCommand.Descricao.trim().length >= 4) {
      this.categoriaService.cadastraCategoria(this.categoriaCommand)
        .subscribe(result => {
          this.resetForm();
          swal({
            position: SWALL_TYPE_POSITION,
            type: SWALL_TYPE_SUCCESS,
            title: SWALL_TYPE_TITLE,
            text: SWALL_MESSAGE_SUCESSO,
            showConfirmButton: false,
            timer: 2500
          });
          this.categoriaUpdated.emit();
          this.resetForm();
          this.modal.close();
        }, error => {
          let errMessage = '';
          errMessage = JSON.parse(error._body).errors[0].message;
          swal({
            position: SWALL_TYPE_POSITION,
            type: SWALL_TYPE_ERROR,
            title: SWALL_TYPE_TITLE,
            text: errMessage != '' ? errMessage : SWALL_MESSAGE_ERRO,
            showConfirmButton: false,
            timer: 2500
          });
        });
    }
  }
}