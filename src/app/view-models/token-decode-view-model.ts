export class TokenDecodeViewModel {
    EMAIL:string;
    NOME: string;
    PERFIL_PA_AUTOR: boolean = false;
    PERFIL_PA_DESGINER_EDUCACIONAL: boolean = false;
    PERFIL_PA_DESIGNER_GRAFICO: boolean = false;
    PERFIL_PA_GESTOR_LIVROS: boolean = false;
    PERFIL_PA_GESTOR_PRODUCAO: boolean = false;
    PERFIL_PA_LIDER_PROCESSO: boolean = false;
    aud: string;
    email: string;
    exp: number = 0;
    iat: number = 0.
    iss: string;
    jti: string;
    nbf: number = 0;
    unique_name: string = "";
    sid: string;
  
    constructor (values: Object = {}){
        Object.assign(this, values);
    }
  }