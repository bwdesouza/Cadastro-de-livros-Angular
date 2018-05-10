import { Injectable } from '@angular/core'
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

//Environment
import { environment } from '../../environments/environment'

@Injectable()
export class PortalAutoriaService {
    private apiUrl = environment.apiUrlPortalAutoria;

    constructor(private http: Http){
    }

    buscarDadosUsuario(applicationUserId): any{
        let url = this.apiUrl + '/usuario/getbyaspnetuser/'
        return this.http.get(url + applicationUserId)
        .map((res: Response) => res.json());
    }
}