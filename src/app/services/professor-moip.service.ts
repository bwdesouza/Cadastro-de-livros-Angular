import { Injectable } from '@angular/core'
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

//Environment
import { environment } from '../../environments/environment'
import { ProfessorMoip } from '../view-models/professor-moip';

@Injectable()
export class ProfessorMoipService {
    private apiUrl = environment.apiUrl + '/professormoip';

    constructor(private http: Http){}

    //Lista todos os Professores cadastrados no Moip
    //Token: Autorização do Método
    //Nome: Nome do Autor
    //ativo: status(1-ativo;0-Inativo;-1-Todos)
    listAll(token: string, nome: string, ativo: string): any {
        let url = this.apiUrl + '/';
        
        return this.http.get(url + token + '/' + nome + '/' + ativo)
        .map((res: Response) => res.json());
    }
    
    //Busca o Token para acesso nos métodos do Moip
    getToken(): any {
        let url = this.apiUrl + '/token';
        return this.http.get(url)
        .map((res: Response) => res.json());
    }
}