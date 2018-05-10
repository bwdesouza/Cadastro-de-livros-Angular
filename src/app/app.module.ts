import { CookieService } from './services/cookie.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LivroService } from './services/livro.service';
import { HttpModule, RequestOptions } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { Routing, RoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { SlideMenuModule } from 'cuppa-ng2-slidemenu/cuppa-ng2-slidemenu';
import { BsModalModule } from 'ng2-bs3-modal';

import { BodyPageComponent } from './components/body-page/body-page.component';
import { HeaderPageComponent } from './components/header-page/header-page.component';
import { TableLivrosComponent } from './pages/table-livros/table-livros.component';
import { CadastroEquipeComponent } from './pages/cadastro-equipe/cadastro-equipe.component';
import { CadastroLivroComponent } from './pages/cadastro-livro/cadastro-livro.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CadastroCategoriaComponent } from './pages/cadastro-categoria/cadastro-categoria.component';
import { CadastroSubCategoriaComponent } from './pages/cadastro-sub-categoria/cadastro-sub-categoria.component';
import { CadastroAutorComponent } from './pages/cadastro-autor/cadastro-autor.component';
import { CadastroEditoraComponent } from './pages/cadastro-editora/cadastro-editora.component';
import { LivroTranspostoComponent } from './pages/livro-transposto/livro-transposto.component'
import { SomenteNumeroDirective } from './directives/somente-numero.directive';
import { AuthRequestOptions } from './providers/AuthRequestOptions';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { TableTransposicaoComponent } from './pages/table-transposicao/table-transposicao.component';

import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2CompleterModule } from "ng2-completer";
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { ImageToDataUrlModule } from "ngx-image2dataurl";
import { NgxPaginationModule } from 'ngx-pagination';
import { FiltroLivrosComponent } from './components/filtro-livros/filtro-livros.component';
import { VisualizarCapaComponent } from './pages/visualizar-capa/visualizar-capa.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderPageComponent,
    BodyPageComponent,
    TableLivrosComponent,
    CadastroEquipeComponent,
    CadastroLivroComponent,
    HomePageComponent,
    CadastroCategoriaComponent,
    CadastroSubCategoriaComponent,
    CadastroAutorComponent,
    CadastroEditoraComponent,
    SomenteNumeroDirective,
    LivroTranspostoComponent,
    FiltroLivrosComponent,
    VisualizarCapaComponent,
    FiltroLivrosComponent,
    VisualizarCapaComponent,
    LivroTranspostoComponent,
    TableTransposicaoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SlideMenuModule,
    BsModalModule,
    HttpModule,
    Routing,
    CurrencyMaskModule,
    TagInputModule,
    BrowserAnimationsModule,
    Ng2CompleterModule,
    ReactiveFormsModule,
    ImageToDataUrlModule,
    NgxPaginationModule,
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [CookieService, { provide: LocationStrategy, useClass: HashLocationStrategy },
  { provide: RequestOptions, useClass: AuthRequestOptions }],
  bootstrap: [AppComponent]
})
export class AppModule { }
