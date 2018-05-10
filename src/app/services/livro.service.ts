import { Injectable } from '@angular/core'
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

//Environment
import { environment } from '../../environments/environment'

import { LivroDigital } from '../view-models/livro-digital';


@Injectable()
export class LivroService {
    private apiUrl = environment.apiUrl + '/livro';

    constructor(private http: Http) { }

   
    cadastrarNovoLivro(novoLivro: LivroDigital): any {
        let url = this.apiUrl;
        return this.http.post(url, novoLivro)
            .map((res: Response) => res.json());
    }

    atualizarLivro(livro: LivroDigital): any {
        let url = this.apiUrl;
        return this.http.put(url, livro)
            .map((res: Response) => res.json());        
    }

    buscarTodosLivros(): any {
        let url = this.apiUrl;
        return this.http.get(url)
            .map((res: Response) => res.json());
    }

    buscarLivro(id: number): any {
        let url = this.apiUrl;
        return this.http.get(url + '/' + id)
            .map((res: Response) => res.json());

    }
    
    deletarLivro(id: number): any {
        let url = this.apiUrl;
        return this.http.delete(url + '/' + id)
        .map((res: Response) => res.json());
    }
} 