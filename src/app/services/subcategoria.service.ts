import { Injectable } from '@angular/core'
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

//Environment
import { environment } from '../../environments/environment'
import { SubCategoria } from '../view-models/subcategoria';

@Injectable()
export class SubCategoriaService {
    private apiUrl = environment.apiUrl + '/subcategoria';

    constructor(private http: Http){}

    cadastraSubCategoria(subcategoria: SubCategoria): any{
        let url = this.apiUrl;
        return this.http.post(url, subcategoria)
        .map((res: Response) => res.json());
    }

    buscarSubCategoria(idCategoria: number): any {
        let url = this.apiUrl;
        return this.http.get(url + '/' + idCategoria)
            .map((res: Response) => res.json());
    }

    buscarCategoria(): any {
        let url = environment.apiUrl + '/categoria';
        return this.http.get(url)
            .map((res: Response) => res.json());
    }
}