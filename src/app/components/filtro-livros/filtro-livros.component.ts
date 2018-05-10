import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filtro-livros',
  templateUrl: './filtro-livros.component.html'
})
export class FiltroLivrosComponent implements OnInit {
  @Output() filtroChange = new EventEmitter();
  @Output() filtroAlfabetoChange = new EventEmitter();
  @Output() abrirEdicao = new EventEmitter(); 

  inputPlaceHolder: string;  

  constructor() { }

  ngOnInit() {    
    var url = window.location.href; 
    
    if(url.indexOf("transposicao") !== -1){
        this.inputPlaceHolder = "Data de Criação / Livro / Pasta de Imagens";
    }
    else{
      this.inputPlaceHolder = "Título / Categoria / ISBN / Edição / Ano / Autoria";
    }
  }

  filtrarLivros(value: string){
    this.filtroChange.emit(value);
  }

  filtrarLivrosAlfabeto(text: any){
    this.filtroAlfabetoChange.emit(text);
  }

  abrirEdicaoLivro(value: number){
    this.abrirEdicao.emit(value);
  } 

}
