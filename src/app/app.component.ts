import { Component } from '@angular/core';
import {LoginService} from "./home/component/Service/LoginService";
import {NetworkService} from "./Service/NetworkService";
import {Storage} from "@ionic/storage";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(public loginService:LoginService,public networkService:NetworkService,private storage:Storage) {
    this.loging();
  }

async  loging(){
    await   this.storage.create();
    this.loginService.verifierLocalStorage();
  }
}
