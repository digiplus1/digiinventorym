import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../home/component/Service/LoginService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-menuoperateur',
  templateUrl: './menuoperateur.page.html',
  styleUrls: ['./menuoperateur.page.scss'],
})
export class MenuoperateurPage implements OnInit {

  menu = [
    {title:"Acceuil",url:"menuoperateur/acceuil",icon:"home-outline",status:'active'},
    {title:"Ajouter equipement",url:"menuoperateur/equipement",icon:"add-circle-outline",status:'none'},
    {title:"A propos",url:"menuoperateur/apropos",icon:"information-outline",status:'none'},
    {title:"Déconnexion",url:"/home/login",icon:"exit-outline"},
  ]
  constructor(public loginService: LoginService,public router:Router) { }
  ngOnInit() {
  }
  onMenuAction(url) {
    if (url.url=="/home/login"){
      this.loginService.deconnexion();
    }else if (url.url=="socialshare"){
    } else {
      this.menu.forEach(m=>{
        m.status='none';
        if (m==url){
          m.status='active';
        }
      })
      this.router.navigateByUrl(url.url)
    }

  }


}
