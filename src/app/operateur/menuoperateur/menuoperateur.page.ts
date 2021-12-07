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
    {title:"Test en cours",url:"menuoperateur/test",icon:"layers-outline",status:'none'},
    {title:"Historique",url:"client/menuclient/historique",icon:"archive-outline",status:'none'},
    {title:"Partager",url:"socialshare",icon:"share-social-outline",status:'none'},
    {title:"Coupon",url:"client/menuclient/coupon",icon:"ear-outline",status:'none'},
    {title:"Profil",url:"client/menuclient/profil",icon:"people-outline",status:'none'},
    {title:"A propos",url:"client/menuclient/apropos",icon:"information-outline",status:'none'},
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
