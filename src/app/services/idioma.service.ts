import { Injectable } from '@angular/core'
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

//Environment
import { environment } from '../../environments/environment'

@Injectable()
export class IdiomaService {
    private apiUrl = environment.apiUrl + '/idioma';

    constructor(private http: Http){
    }

    buscarIdiomas(): any{
        return this.http.get(this.apiUrl)
        .map((res: Response) => res.json());
    }
}