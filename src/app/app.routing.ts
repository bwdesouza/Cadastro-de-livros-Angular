import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroLivroComponent } from './pages/cadastro-livro/cadastro-livro.component';
import { CadastroEquipeComponent } from './pages/cadastro-equipe/cadastro-equipe.component';
import { TableLivrosComponent } from './pages/table-livros/table-livros.component';
import { BodyPageComponent } from './components/body-page/body-page.component';
import { HeaderPageComponent } from './components/header-page/header-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TableTransposicaoComponent } from './pages/table-transposicao/table-transposicao.component';

const appRoutes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'cadastro-livro', component: CadastroLivroComponent },
    { path: 'transposicao', component: TableTransposicaoComponent }
];

export const RoutingProviders: any[] = [];
export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
