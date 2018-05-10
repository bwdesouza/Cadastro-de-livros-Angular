import { PortalAutoriaService } from '../../services/portal-autoria.service';
import { VisualizarCapaComponent } from '../../pages/visualizar-capa/visualizar-capa.component';
import { CookieService } from '../../services/cookie.service';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment'
const URL_INITMOIP = environment.urlInicialMoip;
@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  providers: [AuthService,PortalAutoriaService]
})
export class HeaderPageComponent implements OnInit {

  linkPortalAutoria = environment.linkPlataformaAutoria;
  urlTransposicao = environment.urlTransposicao;
  URL_MOIP = environment.urlLoginMoip;
  URL_inicialmoip = URL_INITMOIP;
  
  @ViewChild('visualizarCapa')
  visualizarCapa: VisualizarCapaComponent;


  dadosBuscaUsuario:any;
  usuario:any;
  usuarioAvatar:any;
  usuarioAvatarPadrao ='../assets/imagem/avatarPadrao.png'

  constructor(private authService: AuthService,
              private cookieService: CookieService,
              private portalAutoriaService: PortalAutoriaService) { 
  }

  ngOnInit() {
    this.dadosBuscaUsuario = this.authService.getUSuario();
    this.usuarioAvatar = this.usuarioAvatarPadrao;
    this.carregaDadosUsuario(this.dadosBuscaUsuario.applicationUserId);
    this.usuario = this.authService.getUser();
  }

  carregaDadosUsuario(applicationUserId){
    this.portalAutoriaService.buscarDadosUsuario(applicationUserId)
      .subscribe(result => {
        if(result.data!=null){
          this.dadosBuscaUsuario = result.data;
          if (this.dadosBuscaUsuario.fotoBase64 == "" || this.dadosBuscaUsuario.fotoBase64 == "0x") {
            this.usuarioAvatar = this.usuarioAvatarPadrao;
          } else {
            this.usuarioAvatar = this.carregaImagem(this.dadosBuscaUsuario.fotoBase64);
          }
        }      
      }, error => {
        console.log(error);
      });
  }

  carregaImagem(img: string) {
    if (img != "")
      return "data:image/jpeg;base64," + img;
  }

  abriVisualizacaoCapa() {
    this.visualizarCapa.abrirModal(this.dadosBuscaUsuario.fotoBase64);
  }

  logout(){
    this.authService.setToken(null);
    this.cookieService.delete(this.authService.cookieName, null, null);
    
    window.location.href = this.URL_MOIP;
  }
}