import { unescape } from 'querystring';
import { Headers, Http, BaseRequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';
import { AuthService } from '../services/auth.service';
import * as jwt_decode from 'jwt-decode';
// import { TOKEN_NAME } from './../auth.service';

const AUTH_HEADER_KEY = 'Authorization';
const AUTH_PREFIX = 'Bearer';

export class AuthRequestOptions extends BaseRequestOptions {

  COOKIE_NAME = 'Token';
  token: string = this.getCookie();

  constructor() {
    super();
    
    if (this.isTokenValid())
      this.headers.append(AUTH_HEADER_KEY, `${AUTH_PREFIX} ${this.token}`);
    else
      window.location.href = environment.linkPlataformaAutoria;
  }

  getCookie() {
    var dc = document.cookie;
    var prefix = this.COOKIE_NAME + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin != 0) return null;
    } else
      begin += 2;
    var end = document.cookie.indexOf(";", begin);
    if (end == -1)
      end = dc.length;
    return dc.substring(begin + prefix.length, end);
  }

  getTokenExpirationDate(token: string): Date {
    try {
      const decoded = jwt_decode(token);

      if (decoded.exp === undefined) return null;

      const date = new Date(0);
      date.setUTCSeconds(decoded.exp);
      return date;
    }
    catch (error) {
      return undefined;
    }
  }

  isTokenValid(): boolean {
    if (this.token == null || this.token == "null") return false;

    const date = this.getTokenExpirationDate(this.token);

    if (date === undefined) return false;

    return (date.valueOf() > new Date().valueOf());
  }

}