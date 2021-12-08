import { Component, OnInit } from '@angular/core';
import {InventaireService} from "../service/InventaireService";
import {LoginService} from "../../home/component/Service/LoginService";

@Component({
  selector: 'app-apropos',
  templateUrl: './apropos.page.html',
  styleUrls: ['./apropos.page.scss'],
})
export class AproposPage implements OnInit {

  constructor( public loginService: LoginService) { }

  ngOnInit() {
  }

}
