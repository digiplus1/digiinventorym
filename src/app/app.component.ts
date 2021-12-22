import { Component } from '@angular/core';
import {LoginService} from "./home/component/Service/LoginService";
import {NetworkService} from "./Service/NetworkService";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public loginService:LoginService,public networkService:NetworkService) {
    this.loging();
  }

  loging(){
    this.loginService.verifierLocalStorage();
  }
}
