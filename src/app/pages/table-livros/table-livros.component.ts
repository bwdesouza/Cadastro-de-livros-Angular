import { LivroTranspostoComponent } from '../livro-transposto/livro-transposto.component';
import { Router } from '@angular/router';
import { CadastroEquipeComponent } from '../../pages/cadastro-equipe/cadastro-equipe.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LivroDigital } from '../../view-models/livro-digital';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { LivroService } from '../../services/livro.service';

import swal from 'sweetalert2'
import { AuthService } from '../../services/auth.service';
import { VisualizarCapaComponent } from '../visualizar-capa/visualizar-capa.component';
import { retryWhen } from 'rxjs/operator/retryWhen';
import { LivroTranspostoService } from '../../services/livro-transposto.service';
import { LivroTrasposto } from '../../view-models/livro-transposto';

@Component({
  selector: 'app-table-livros',
  templateUrl: './table-livros.component.html',
  providers: [LivroService, AuthService, LivroTranspostoService]
})
export class TableLivrosComponent implements OnInit {

  @ViewChild('paginationApi')
  paginationApi: any;
  
  @ViewChild('visualizarCapa')
  visualizarCapa: VisualizarCapaComponent;

  @ViewChild('vinculoLivroTransposto')
  livroTransposto: LivroTranspostoComponent;
  livros: LivroDigital[] = [];
  livrosBackup: LivroDigital[] = [];
  pageSize: number = 10;
  user: any;

  constructor(private livroService: LivroService,
    private router: Router,
    private spinnerService: Ng4LoadingSpinnerService,
    private authService: AuthService,
    private livroTranspostoService: LivroTranspostoService
    ) {
  }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.spinnerService.show();
    this.carregaTodosLivros();
  }

  carregaTodosLivros() {
    this.livroService.buscarTodosLivros()
      .subscribe(result => {
        this.livros = [];
        result.data.forEach(livro => {
          this.livros.push(livro);
        });
        this.livrosBackup = this.livros;
        this.spinnerService.hide();
      }, error => {
        swal({
          title: 'Algo de errado aconteceu!',
          text: 'Por favor tente novamente ou contate a equipe tecnica!',
          type: 'error',
          confirmButtonText: 'Ok'
        });
        this.spinnerService.hide();
      });
  }

  abriVisualizacaoCapa(img: string) {
    this.visualizarCapa.abrirModal(img);
  }

  abriLivroTransposto(idLivro: number) {
    this.livroTransposto.abrirModal(idLivro);
  }

  abrirEdicaoLivro(id: string) {
    let objLivro = {
      id: id,
      visual: false
    }
    localStorage.setItem("objLivro", JSON.stringify(objLivro));
    this.router.navigate(['/cadastro-livro']);
  }

  abrirVisualizacaoLivro(id: number) {
    let objLivro = {
      id: id,
      visual: true
    }
    localStorage.setItem("objLivro", JSON.stringify(objLivro));
    this.router.navigate(['/cadastro-livro']);
  }

  carregaImagem(img: string) {
    if (img != "" && img != null && img != 'null')
      return "data:image/jpeg;base64," + img;
    else
      return "../assets/imagem/empyt.png";
  }

  carregarClasseStatus(value: any){
    if(value == null || value == 'null' || value == undefined){
      return "label label-primary";
    }
    else{
      if(+value == 1)
        return "label label-primary";
      else if(+value == 2)
      return "label label-warning";
      else if(+value == 3)
      return "label label-danger";
      else if(+value == 4)
      return "label label-success";
      else if(+value == 5)
      return "label label-info";
      else if(+value == 6)
      return "label label-primary";
    }
  }

  filtrarLivros(value: string) {
    this.livros = this.livrosBackup;
    let listaFiltrada = [];
    this.livros.forEach(liv => {
      if (liv.titulo.toUpperCase().indexOf(value.toUpperCase()) != -1 || liv.autoria.toUpperCase().indexOf(value.toUpperCase()) != -1
      || liv.categoria.descricao.toUpperCase().indexOf(value.toUpperCase()) != -1 || liv.isbnDigital.toUpperCase().indexOf(value.toUpperCase()) != -1
      || liv.edicao.toString().indexOf(value) != -1 || liv.ano.toString().indexOf(value) != -1) {
        listaFiltrada.push(liv);
      }
    });
    this.livros = listaFiltrada;
  }

  filtrarLivrosAlfabeto(text: any){
    if(text == 'clear'){      
      this.livros = this.livrosBackup;
      return;
    }
    
    let value = text.target.innerText;
    this.livros = this.livrosBackup;
    let listaFiltrada = [];
    this.livros.forEach(liv => {
      if (liv.titulo.toUpperCase().substring(0,1) == value.toUpperCase().trim() || liv.autoria.toUpperCase().substring(0,1) == value.toUpperCase().trim()) {
        listaFiltrada.push(liv);
      }
    });
    this.livros = listaFiltrada;
  }

  abrirExclusaoLivro(id: number) {
    swal({
      title: 'Confirmação',
      text: 'Tem certeza que deseja excluir este livro?',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#30d654',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, desejo excluir!',
      cancelButtonText: 'Não, cancelar!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      reverseButtons: true
    }).then((result) => {
      this.spinnerService.show();
      if (result.value) {
        this.livroService.deletarLivro(id)
          .subscribe(result => {
            swal({
              position: 'top-right',
              type: 'success',
              title: result.data,
              showConfirmButton: false,
              timer: 2000
            });
            this.carregaTodosLivros();
          }, error => {
            this.spinnerService.hide();
            let msgError = JSON.parse(error._body);
            swal({
              title: 'Algo de errado aconteceu!',
              text: msgError.errors[0].message,
              type: 'error',
              confirmButtonText: 'Ok'
            });
          });
      } else if (result.dismiss === 'cancel') {
        this.spinnerService.hide();
        swal({
          position: 'center',
          type: 'info',
          title: 'A deleção do livro foi cancelada!',
          showConfirmButton: false,
          timer: 2000
        });
      }
    });
  }

  permissaoVisualizarBotao(): boolean {
    if (this.user.PERFIL_PA_LIDER_PROCESSO == "true" || this.user.PERFIL_PA_GESTOR_LIVROS == "true")
      return true;
    else
      return false
  }

  permissaoPreview(id: number): boolean {
      //exibe botão preview se já possui livro vinculado && permissaoVisualizarBotao()
      // this.livroTranspostoService.buscarLivroTranspostoById(id).subscribe(
      //       result => {              
      //        if(result.data == null){
      //          return false;
      //        }
      //        return this.permissaoVisualizarBotao();

      //       }, error => {                
      //           return false;
      //         });
      // return false;
      return this.permissaoVisualizarBotao();
  }

  exibirPreview(id: number){
      alert("Irá chamar método para preview de livro transposto.");
    }

}
