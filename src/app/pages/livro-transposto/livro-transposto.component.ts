import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { BsModalComponent } from 'ng2-bs3-modal';
import swal from 'sweetalert2'
import { LivroTranspostoService } from '../../services/livro-transposto.service';
import { LivroTrasposto } from '../../view-models/livro-transposto';
import { CompleterData, CompleterService } from 'ng2-completer';
import { LivroService } from '../../services/livro.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const SWALL_TYPE_TITLE = 'Vínculo Livro Transposto';
const SWALL_TYPE_POSITION = 'top-right';
const SWALL_TYPE_SUCCESS = 'success';
const SWALL_TYPE_ERROR = 'error';
const SWALL_MESSAGE_SUCESSO = 'Livro Transposto foi atualizado com sucesso!';
const SWALL_MESSAGE_ERRO = 'Por favor tente novamente ou contate a equipe técnica!';


@Component({
  selector: 'app-livro-transposto',
  templateUrl: './livro-transposto.component.html',
  providers: [LivroTranspostoService, LivroService]
})
export class LivroTranspostoComponent implements OnInit {
  @ViewChild('modal')
  modal: BsModalComponent;
  livroDigitalGroupVinculoTransposto: FormGroup;

  livrosTranspostos = new Array<LivroTrasposto>();
  livroTranspostoCommand: any;
  protected LivroTranspostoDS: CompleterData;
  USUARIO_LOGADO: any;

  constructor(private livrotranspostoService: LivroTranspostoService, 
    private completerService: CompleterService,
    private livroservice: LivroService, 
    private authService: AuthService, 
    private fb: FormBuilder) {
      
  }

  ngOnInit() {
    this.carregaFormulario();
    this.carregaLivroTransposto();
  }

  resetForm() {
    if (this.livroDigitalGroupVinculoTransposto != undefined) {
      this.livroDigitalGroupVinculoTransposto.reset({ lvtransposto: "" });
    }
    this.livroTranspostoCommand = {
      idLivroDigital: 0,
      IdUsuario: this.USUARIO_LOGADO.id,
      IdPerfil: this.USUARIO_LOGADO.lstPerfis[0].id
    }
  }

  carregaFormulario() {
    this.USUARIO_LOGADO = this.authService.getUSuario();
    this.resetForm();
    this.livroDigitalGroupVinculoTransposto = this.fb.group({
      lvtransposto: new FormControl('', [Validators.required])
    });
  }

  preencherlivrotransposto(selected) {
    if(selected!=null){
      this.livroTranspostoCommand.idLivroTransposto = selected.originalObject.id;
    }
  }

  abrirModal(idLivroDigital: number) {
    this.livroTranspostoCommand.idLivroDigital = idLivroDigital;
    this.modal.open();
  }

  fecharModal() {
    this.resetForm();
    this.modal.close();
  }

  Cadastrar() {
    this.livrotranspostoService.atualizaLivroTransposto(this.livroTranspostoCommand)
      .subscribe(result => {
        swal({
          position: SWALL_TYPE_POSITION,
          type: SWALL_TYPE_SUCCESS,
          title: SWALL_TYPE_TITLE,
          text: SWALL_MESSAGE_SUCESSO,
          showConfirmButton: false,
          timer: 2500
        });
        this.resetForm();
        this.modal.close();
        this.carregaLivroTransposto();
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

  carregaLivroTransposto() {
    this.livrotranspostoService.buscarLivroTransposto()
      .subscribe(result => {
        this.livrosTranspostos = [];
        result.data.forEach(livT => {
          this.livrosTranspostos.push(livT);
        });
        this.LivroTranspostoDS = this.completerService.local(this.livrosTranspostos, 'nome', 'nome');
      }, error => {
        swal({
          position: SWALL_TYPE_POSITION,
          title: SWALL_TYPE_TITLE,
          text: SWALL_MESSAGE_ERRO,
          type: SWALL_TYPE_ERROR,
          showConfirmButton: false,
          timer: 2500
        });
      });
  }
}
