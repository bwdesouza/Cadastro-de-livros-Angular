import { Component } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Plataforma Autoral';
  template: string = '<img src="./assets/imagem/spinner.gif">';
}