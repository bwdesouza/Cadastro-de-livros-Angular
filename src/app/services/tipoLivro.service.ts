import { Injectable } from '@angular/core'
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

//Environment
import { environment } from '../../environments/environment'
import { TipoLivro } from '../view-models/tipoLivro';

@Injectable()
export class TipoLivroService {
    private apiUrl = environment.apiUrl + '/tipolivro';

    constructor(private http: Http){}

    ListAll(): any{
        return this.http.get(this.apiUrl).map((res: Response) => res.json());
    }
}