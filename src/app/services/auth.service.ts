import { CookieService } from './cookie.service';
import { escape, unescape } from 'querystring';
import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import * as jwt_decode from 'jwt-decode';

export const TOKEN_NAME: string = 'jwt_token';
export const DECODETOKEN_NAME: string = 'decoded_user';
export const USER_NAME: string = 'usuario_app';
export const DOMAIN: string = 'localhost';

@Injectable()
export class AuthService {
  cookieName = 'Token';
  cookieUsuarioName = 'Usuario';
  token: string;
  Usuario: any;

  constructor(private cookieService : CookieService) {
      this.token = this.cookieService.get(this.cookieName);
      this.Usuario = this.cookieService.get(this.cookieUsuarioName);
  }

  getDecodedToken() {
    if(this.token == "null") return null;
    return jwt_decode(this.token);
  }

  getUSuario(){
    return JSON.parse(this.Usuario);
  }

  getUser() {
    var usuario = this.getDecodedToken();
    if(usuario == null || usuario == "null")
    {
      return {
        EMAIL:"",
        NOME:"",
        PERFIL_PA_AUTOR: false,
        PERFIL_PA_DESGINER_EDUCACIONAL:false,
        PERFIL_PA_DESIGNER_GRAFICO: false,
        PERFIL_PA_GESTOR_LIVROS: false,
        PERFIL_PA_GESTOR_PRODUCAO: false,
        PERFIL_PA_LIDER_PROCESSO: false,
        aud:"",
        email:"",
        exp:0,
        iat:0,
        iss:"",
        jti:"",
        nbf:0,
        unique_name:""
      };
    }
    return usuario;
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
    
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.cookieService.set(this.cookieName, token, tomorrow, '/', DOMAIN, null);

    var usuario = this.getDecodedToken();
    this.setDecodeToken(usuario);
  }

  setDecodeToken(user: string): void{
    localStorage.setItem(DECODETOKEN_NAME, JSON.stringify(user));
  }
}
