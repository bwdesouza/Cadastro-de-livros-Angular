import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

import swal from 'sweetalert2'
import { AuthService } from '../../services/auth.service';
import { retryWhen } from 'rxjs/operator/retryWhen';
import { TransposicaoService } from '../../services/transposicao.service';
import { Transposicao } from '../../view-models/transposicao';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { environment } from '../../../environments/environment';

const URL_EDITORDIGITAL = environment.urlEditorPreview;

@Component({
  selector: 'app-table-transposicao',
  templateUrl: './table-transposicao.component.html',
  providers: [Transposicao, AuthService, TransposicaoService]
})

export class TableTransposicaoComponent implements OnInit {

    @ViewChild('paginationApi')
    paginationApi: any;                 
    livros: Transposicao[] = [];
    livrosBackup: Transposicao[] = [];
    pageSize: number = 10;
    user: any;   
  
    constructor(private transposicaoService: TransposicaoService,
      private router: Router,
      private spinnerService: Ng4LoadingSpinnerService,
      private authService: AuthService
        ) {
    }
  
    ngOnInit() {
      this.user = this.authService.getUser();
      this.spinnerService.show();
      this.carregarLivros();                      
    }
  
    carregarLivros() {
      this.transposicaoService.get()
        .subscribe(result => {
          this.livros = [];
          result.data.forEach(livro => {

            var timestamp =livro.id.toString().substring(0,8);//ObjectId do mongo já possui a CreationDate            
            livro.dataCriacao = new Date( parseInt( timestamp, 16 ) * 1000 ).toLocaleString();
               
            this.livros.push(livro);
          });
          this.livrosBackup = this.livros;
          this.spinnerService.hide();
        }, error => {
          this.msgAlert('error', 'Algo de errado aconteceu!', 'Por favor tente novamente ou contate a equipe técnica!');
        });
    }       
  
    iniciarTransposicao() {
      var contPasta = 0;

      this.transposicaoService.processar().subscribe(
          result => {
             contPasta = result.data;
             
             if(contPasta == 0){
              this.msgAlert('warning', 'Nenhum livro para Transposição', 'Nenhum livro encontrado na pasta Processar.');
            }else{
                  swal({
                    title: 'Iniciar Transposição?',
                    text: "Existe(m) " + contPasta.toString() + " livro(s) para transposição.",
                    type: 'question',
                    showCancelButton: true,                   
                    confirmButtonText: 'Sim',
                    cancelButtonText: 'Não'
                  }).then((result) => {
                    if (result.value) {

                      this.transposicaoService.producer().subscribe(
                          result => {                           
                              swal(
                                'Iniciado..',
                                'O Serviço foi iniciado e está na fila de processamento.',
                                'success'
                              );     
                          }                      
                        )
                    }
                  });
            }

            } ,
          erro => {
            this.msgAlert('error', 'Algo de errado aconteceu!', 'Por favor tente novamente ou contate a equipe técnica!');
          });          
    }
  
    abrirVisualizacaoLivro(id: any) {     
      window.open(`${URL_EDITORDIGITAL}?id=${id}`, '_blank');
    }
  
    filtrarLivros(value: string) {        
        this.livros = this.livrosBackup;
        let listaFiltrada = [];
        this.livros.forEach(liv => {
          if (liv.dataCriacao.toString().indexOf(value.toUpperCase()) != -1 || liv.nome.toUpperCase().indexOf(value.toUpperCase()) != -1
          || liv.nomePastaImagem.toUpperCase().indexOf(value.toUpperCase()) != -1) {
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
          if (liv.nome.toUpperCase().substring(0,1) == value.toUpperCase().trim()) {
            listaFiltrada.push(liv);
          }
        });
        this.livros = listaFiltrada;
      }     
  
    permissaoVisualizarBotao(): boolean {
      if (this.user.PERFIL_PA_LIDER_PROCESSO == "true" || this.user.PERFIL_PA_GESTOR_LIVROS == "true")
        return true;
      else
        return false
    }

    msgAlert(tipo: any, title: string, text: string){           

      swal({
        title: title,//'Algo de errado aconteceu!',
        text: text,//'Por favor tente novamente ou contate a equipe técnica!',
        type: tipo,//'error',
        confirmButtonText: 'Ok'
      });
      this.spinnerService.hide();
    }
  
  }