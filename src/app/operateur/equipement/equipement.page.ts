import {Component, OnInit} from '@angular/core';
import {Immobilisation} from "../Model/Immobilisation";
import {Inventaire} from "../Model/Inventaire";
import {ModalController} from "@ionic/angular";
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import {InventaireService} from "../service/InventaireService";
import {Router} from "@angular/router";
import {ModallisteequipementComponent} from "./modallisteequipement/modallisteequipement.component";


@Component({
  selector: 'app-equipement',
  templateUrl: './equipement.page.html',
  styleUrls: ['./equipement.page.scss'],
})
export class EquipementPage implements OnInit {

  immobilisation:Immobilisation=new Immobilisation();
  is_loading: boolean;



  constructor(private modalController: ModalController, private barcodeScanner: BarcodeScanner,
              public inventaireService: InventaireService, public router: Router) {

  }

  ngOnInit() {
  }

  async modalimmobilisation(cT: Immobilisation[]) {
    const modal = await this.modalController.create({
      component: ModallisteequipementComponent,
      cssClass: "modalnewimmo",
      componentProps: {
        'immo': cT
      },
      backdropDismiss:false
    });
    return await modal.present();
  }

  scannerbarcode() {
    /* //https://enappd.com/blog/ionic-complete-guide-barcode-qrcode-scan/140/ */

    this.barcodeScanner.scan().then(barcodeData => {
      alert(barcodeData.text)
      let inven: Immobilisation = JSON.parse(barcodeData.text);
      if (inven.codeBarre) {
        this.immobilisation =inven;
      } else if (barcodeData.text) {
        inven.codeBarre = barcodeData.text;
      }else  {
        this.inventaireService.loginService.toastMessage("Immobilisation non trouvée", "info")
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }

  valider() {
    this.is_loading=true;
    this.immobilisation.referencesession=this.inventaireService.loginService.userLogin.referencesession;
    this.immobilisation.referenceoperateur=this.inventaireService.loginService.userLogin.matricule;
    this.inventaireService.validerNouvelleInventaire(this.immobilisation).subscribe(
      data=>{
        this.is_loading=false;
        this.immobilisation=data;
      },error => {
        this.is_loading=false;
      }
    )
  }


  getAllNouvelleInventaire() {
    this.inventaireService.getAllNouvelleInventaire().subscribe(
      data=>{
        if (data)
        this.modalimmobilisation(data)
      },error => {
      }
    )
  }
}
