import { Injectable } from '@angular/core'
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

//Environment
import { environment } from '../../environments/environment'

@Injectable()
export class TagsService {
    private apiUrl = environment.apiUrl + '/tags';

    constructor(private http: Http){
    }

    buscarTags(): any{
        let url = this.apiUrl;
        return this.http.get(url)
        .map((res: Response) => res.json());
    }
}