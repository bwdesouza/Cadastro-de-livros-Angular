import { Injectable } from '@angular/core'
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

//Environment
import { environment } from '../../environments/environment'
import { Funcao } from '../view-models/funcao';

@Injectable()
export class FuncaoService {
    private apiUrl = environment.apiUrl + '/funcao';

    constructor(private http: Http){
    }

    buscarFuncoes(): any{
        return this.http.get(this.apiUrl)
        .map((res: Response) => res.json());
    }

    cadastroFuncao(funcao: Funcao): any{
        let url = this.apiUrl;
        return this.http.post(url, funcao)
        .map((res: Response) => res.json());
    }
}