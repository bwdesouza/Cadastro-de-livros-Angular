import { BsModalComponent } from 'ng2-bs3-modal';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { SubCategoriaService } from '../../services/subcategoria.service';
import { SubCategoria } from '../../view-models/subcategoria';
import { Categoria } from '../../view-models/categoria';
import { CompleterData, CompleterService } from 'ng2-completer';
import { CategoriaService } from '../../services/categoria.service';

import swal from 'sweetalert2'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const SWALL_TYPE_TITLE = 'Cadastro de subcategoria';
const SWALL_TYPE_POSITION = 'top-right';
const SWALL_TYPE_SUCCESS = 'success';
const SWALL_TYPE_ERROR = 'error';
const SWALL_MESSAGE_SUCESSO = 'Subcategoria foi cadastrada com sucesso!';
const SWALL_MESSAGE_ERRO = 'Por favor tente novamente ou contate a equipe técnica!';

@Component({
  selector: 'app-cadastro-sub-categoria',
  templateUrl: './cadastro-sub-categoria.component.html',
  providers: [SubCategoriaService, CategoriaService]
})
export class CadastroSubCategoriaComponent implements OnInit {
  @Output() subCategoriaUpdated = new EventEmitter();
  
  @ViewChild('modal')
  modal: BsModalComponent;
  livroDigitalGroupSubCategoria: FormGroup;
  SubCategoriaCommand: any;

  categorias = new Array<Categoria>();
  subcategoriadescricao: any;
  protected categoriaDS: CompleterData;

  constructor(private subcategoriaService: SubCategoriaService,
    private categoriaService: CategoriaService,
    private completerService: CompleterService,
    private fb: FormBuilder) {

  }

  ngOnInit() {
    this.carregaFormulario();
  }

  carregaFormulario() {
    this.resetForm();
    this.livroDigitalGroupSubCategoria = this.fb.group({
      categoria: new FormControl('', [Validators.required]),
      descricao: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  preenchercategoria(selected) {
    this.SubCategoriaCommand.IdCategoria = selected.originalObject.id;
  }

  abrirModal() {
    this.carregaCategoria();
    this.modal.open();
  }

  fecharModal() {
    this.resetForm();
    this.modal.close();
  }

  resetForm() {
    if (this.livroDigitalGroupSubCategoria != undefined) {
      this.livroDigitalGroupSubCategoria.reset({ categoria: "", descricao: "" });
    }
    this.SubCategoriaCommand = { IdCategoria: 0, Descricao: "" };
  }

  Cadastrar() {
    this.SubCategoriaCommand.Descricao = this.livroDigitalGroupSubCategoria.value['descricao'];
    if (this.SubCategoriaCommand.Descricao != '' && this.SubCategoriaCommand.Descricao.trim().length >= 4) {
      this.subcategoriaService.cadastraSubCategoria(this.SubCategoriaCommand)
        .subscribe(result => {
          swal({
            position: SWALL_TYPE_POSITION,
            type: SWALL_TYPE_SUCCESS,
            title: SWALL_TYPE_TITLE,
            text: SWALL_MESSAGE_SUCESSO,
            showConfirmButton: false,
            timer: 2500
          });
          this.subCategoriaUpdated.emit();
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

  carregaCategoria() {
    this.categoriaService.buscarCategoria()
      .subscribe(result => {
        this.categorias = [];
        result.data.forEach(Categoria => {
          this.categorias.push(Categoria);
        });
        this.categoriaDS = this.completerService.local(this.categorias, 'descricao', 'descricao');
      }, error => {
        console.log(error);
      });
  }
}