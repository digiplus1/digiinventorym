import { Component, OnInit } from '@angular/core';
import {Inventairesoumision} from "../../Model/Inventairesoumision";
import {ModalController, NavParams} from "@ionic/angular";
import {InventaireService} from "../../service/InventaireService";
import {Immobilisation} from "../../Model/Immobilisation";

@Component({
  selector: 'app-modallisteequipement',
  templateUrl: './modallisteequipement.component.html',
  styleUrls: ['./modallisteequipement.component.scss'],
})
export class ModallisteequipementComponent implements OnInit {
  immobilisations: Immobilisation[] ;

  constructor(private navParam: NavParams, private modalController: ModalController, public inventaireService: InventaireService) {
  }

  ngOnInit() {
    console.log(this.navParam.get("immo"));
    this.immobilisations = this.navParam.get("immo");
  }
  closeModal() {
    this.modalController.dismiss();
  }
}
