import { Injectable } from '@angular/core'
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

//Environment
import { environment } from '../../environments/environment'
import { Editora } from '../view-models/editora';

@Injectable()
export class EditoraService {
    private apiUrl = environment.apiUrl + '/editora';

    constructor(private http: Http){}
   
    listAll(): any {
        let url = this.apiUrl;
        return this.http.get(url)
            .map((res: Response) => res.json());

    }
    
    insert(Editora): any {
        let url = this.apiUrl;
             return this.http.post(url, Editora)
                 .map((res: Response) => res.json());
         }
}