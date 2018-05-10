import { Injectable } from '@angular/core'
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

//Environment
import { environment } from '../../environments/environment'
import { LivroTrasposto } from '../view-models/livro-transposto';


@Injectable()
export class LivroTranspostoService {
    private apiUrl = environment.apiUrl + '/livroTransposto';

    constructor(private http: Http
        
    ){}

    buscarLivroTransposto(): any {
        let url = this.apiUrl;
        return this.http.get(url)
            .map((res: Response) => res.json());
    }
    atualizaLivroTransposto(params): any {
        
        let url = this.apiUrl;
             return this.http.put(url, params)
                 .map((res: Response) => res.json());
         }

    buscarLivroTranspostoById(params): any {
        let url = this.apiUrl;
        return this.http.get(url, params)
            .map((res: Response) => res.json());    
    }
   
}