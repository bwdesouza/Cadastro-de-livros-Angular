import { Injectable } from '@angular/core'
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

//Environment
import { environment } from '../../environments/environment'

@Injectable()
export class PaisService {
    private apiUrl = environment.apiUrl + '/pais';

    constructor(private http: Http){}

    buscarPaises(): any{
        return this.http.get(this.apiUrl)
        .map((res: Response) => res.json());
    }
}