import { Injectable } from '@angular/core'
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

//Environment
import { environment } from '../../environments/environment'
import { Categoria } from '../view-models/categoria';

@Injectable()
export class CategoriaService {
    private apiUrl = environment.apiUrl + '/categoria';

    constructor(private http: Http){}

    cadastraCategoria(categoria: Categoria): any{
        let url = this.apiUrl;
        return this.http.post(url, categoria)
        .map((res: Response) => res.json());
    }
    
    buscarCategoria(): any {
        let url = this.apiUrl;
        return this.http.get(url)
            .map((res: Response) => res.json());
    }
}