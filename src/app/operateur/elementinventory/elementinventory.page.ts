import { Component, OnInit } from '@angular/core';
import {InventaireService} from "../service/InventaireService";
import {InventairePage} from "../Model/InventairePage";
import {ModalController} from "@ionic/angular";
import {Immobilisation} from "../Model/Immobilisation";
import {ModalinventaireComponent} from "./modalinventaire/modalinventaire.component";
import {Inventaire} from "../Model/Inventaire";
import {EvolutionInventaire} from "../Model/EvolutionInventaire";
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import {Inventairesoumision} from "../Model/Inventairesoumision";

@Component({
  selector: 'app-elementinventory',
  templateUrl: './elementinventory.page.html',
  styleUrls: ['./elementinventory.page.scss'],
})
export class ElementinventoryPage implements OnInit {

  constructor(  private modalController : ModalController,private barcodeScanner: BarcodeScanner,public inventaireService:InventaireService) { }

  inventairepage:InventairePage;
  evolutionInventaire:EvolutionInventaire=new EvolutionInventaire();
  ngOnInit() {
    this.getimmo();
    this.getEvolution();
  }


  scannerbarcode(){
    this.barcodeScanner.scan().then(barcodeData => {
      let inventaire= this.inventairepage.results.find(i=>i.immobilisation.reference==barcodeData.text);

      if (inventaire.immobilisation.is_generique){
        this.modalimmobilisation(inventaire);
      }else {
        let invensoumission:Inventairesoumision=new Inventairesoumision();
        invensoumission.referenceimmobilisation=inventaire.immobilisation.reference;
        invensoumission.referenceInventaire=inventaire.referenceInventaire;
        invensoumission.quantite=1
        this.inventaireService.valideImmo(invensoumission,inventaire.id).subscribe(
          data=>{
          },error => {
          }
        )
      }

    }).catch(err => {
      console.log('Error', err);
    });
  }

  async modalimmobilisation(cT : Inventaire) {
    const modal = await this.modalController.create({
      component: ModalinventaireComponent,
      cssClass:"modalimmobilisation",
      componentProps: {
        'immo' : cT
      }
    });
    return await modal.present();
  }
  getimmo(){
    this.inventaireService.getlisteinventaire().subscribe(
      data=>{
       this.inventairepage=data;
      }
    )
  }

  getEvolution(){
    this.inventaireService.getEvolution().subscribe(
      data=>{
        this.evolutionInventaire=data;
      }
    )
  }

  validerInventaire() {

  }
}
