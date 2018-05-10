import { BsModalComponent } from 'ng2-bs3-modal';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { EditoraService } from '../../services/editora.service';
import { Editora } from '../../view-models/editora';

import swal from 'sweetalert2'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { validateConfig } from '@angular/router/src/config';

const SWALL_TYPE_TITLE = 'Cadastro de editora';
const SWALL_TYPE_POSITION = 'top-right';
const SWALL_TYPE_SUCCESS = 'success';
const SWALL_TYPE_ERROR = 'error';
const SWALL_MESSAGE_SUCESSO = 'Editora foi cadastrada com sucesso!';
const SWALL_MESSAGE_ERRO = 'Por favor tente novamente ou contate a equipe técnica!';


@Component({
  selector: 'app-cadastro-editora',
  templateUrl: './cadastro-editora.component.html',
  providers: [EditoraService]
})

export class CadastroEditoraComponent implements OnInit {
  @Output() editoraUpdated = new EventEmitter();
  @ViewChild('modal')
  modal: BsModalComponent;
  livroDigitalGroupEditora: FormGroup;
  editoraCommand: any;
  
  constructor(private editoraService: EditoraService,
    private fb: FormBuilder) {

  }

  ngOnInit() {
    this.carregaFormulario();
  }

  carregaFormulario() {
    this.resetForm();
    this.livroDigitalGroupEditora = this.fb.group({
      descricao: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }


  resetForm() {
    if (this.livroDigitalGroupEditora != undefined) {
      this.livroDigitalGroupEditora.reset({ descricao: "" });
    }
    this.editoraCommand = { Descricao: "" };
  }

  abrirModal() {
    this.modal.open();
  }

  fecharModal() {
    this.resetForm();
    this.modal.close();
  }


  Cadastrar() {
    this.editoraCommand.Descricao = this.livroDigitalGroupEditora.value['descricao'];
    if (this.editoraCommand.Descricao != '' && this.editoraCommand.Descricao.trim().length >= 4) {
      this.editoraService.insert(this.editoraCommand)
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
          this.editoraUpdated.emit();
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