import {Component, OnInit} from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";
import {Immobilisation} from "../../Model/Immobilisation";
import {Inventaire} from "../../Model/Inventaire";
import {Inventairesoumision} from "../../Model/Inventairesoumision";
import {InventaireService} from "../../service/InventaireService";

@Component({
  selector: 'app-modalinventaire',
  templateUrl: './modalinventaire.component.html',
  styleUrls: ['./modalinventaire.component.scss'],
})
export class ModalinventaireComponent implements OnInit {
  is_loading: boolean;
  immo: Inventaire;
  inventairesoumi: Inventairesoumision = new Inventairesoumision();

  constructor(private navParam: NavParams, private modalController: ModalController, public inventaireService: InventaireService) {
  }

  ngOnInit() {
    this.immo = this.navParam.get("immo");
    this.inventairesoumi.referenceInventaire = this.immo.referenceInventaire;
    this.inventairesoumi.referenceimmobilisation = this.immo.immobilisation.reference;
    this.inventairesoumi.quantite = this.immo.quantite;
  }

  closeModal() {
    this.modalController.dismiss();
  }

  valider() {
    this.inventaireService.valideImmo(this.inventairesoumi, this.immo.id);
    this.modalController.dismiss();
  }

  getEvolution() {
    this.inventaireService.getEvolution()
  }

  mouvement(status: string) {
    if (status == "add") {
      this.inventairesoumi.quantite += 1;
    } else if (status == "remove") {
      if (this.inventairesoumi.quantite >= 0) {
        this.inventairesoumi.quantite -= 1;
      }

    }
  }
}
