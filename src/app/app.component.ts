import { Component } from '@angular/core';
import {LoginService} from "./home/component/Service/LoginService";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public loginService:LoginService) {
    this.loging();
  }

  loging(){
    this.loginService.verifierLocalStorage();
  }
}
