import { Injectable } from '@angular/core'
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

//Environment
import { environment } from '../../environments/environment'
import { Transposicao } from '../view-models/transposicao';

@Injectable()
export class TransposicaoService {
    private apiUrl = environment.apiUrl + '/transposicao';

    constructor(private http: Http
        
    ){}

    get(): any {        
        let url = this.apiUrl;
        return this.http.get(url)
            .map((res: Response) => res.json());
    }

    processar(): any {        
        let url = this.apiUrl + "/processar";
        return this.http.get(url)
            .map((res: Response) => res.json());
    } 

    producer(): any {        
        let url = this.apiUrl + "/producer";
        return this.http.get(url)
            .map((res: Response) => res.json());
    } 
}