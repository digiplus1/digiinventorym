import {Component, OnInit} from '@angular/core';
import {InventaireService} from "../service/InventaireService";
import {InventairePage} from "../Model/InventairePage";
import {ModalController} from "@ionic/angular";
import {Immobilisation} from "../Model/Immobilisation";
import {ModalinventaireComponent} from "./modalinventaire/modalinventaire.component";
import {Inventaire} from "../Model/Inventaire";
import {EvolutionInventaire} from "../Model/EvolutionInventaire";
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import {Inventairesoumision} from "../Model/Inventairesoumision";
import {ClotureOperateur} from "../Model/ClotureOperateur";

@Component({
  selector: 'app-elementinventory',
  templateUrl: './elementinventory.page.html',
  styleUrls: ['./elementinventory.page.scss'],
})
export class ElementinventoryPage implements OnInit {
  searcheItem: Inventaire[];
  is_loading: boolean;

  constructor(private modalController: ModalController, private barcodeScanner: BarcodeScanner,
              public inventaireService: InventaireService) {
  }


  ngOnInit() {
    this.getimmo();
    this.getEvolution();
  }

  ionChange(even: any) {
    const val = even.target.value;
    this.searcheItem = this.inventaireService.inventaires;
    if (val && val.trim() != '') {
      this.searcheItem = this.searcheItem.filter(item => {
        return (item.immobilisation.libelle.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.searcheItem = this.inventaireService.inventaires;
    }
  }

  scannerbarcode() {
    this.barcodeScanner.scan().then(barcodeData => {
      alert(barcodeData.text);
      let inventaire = this.inventaireService.inventaires.find(i => i.immobilisation.reference == barcodeData.text);

      if (inventaire.immobilisation.is_generique) {
        this.modalimmobilisation(inventaire);
      } else {
        let invensoumission: Inventairesoumision = new Inventairesoumision();
        invensoumission.referenceimmobilisation = inventaire.immobilisation.reference;
        invensoumission.referenceInventaire = inventaire.referenceInventaire;
        invensoumission.quantite = 1
        this.inventaireService.valideImmo(invensoumission, inventaire.id).subscribe(
          data => {

            this.inventaireService.inventaires.forEach(i => {
                if (i.referenceInventaire == data.referenceInventaire) {
                  i.quantite = data.quantite
                  i.etat = "en_cours";
                }
              }
            )


          }, error => {
          }
        )
      }

    }).catch(err => {
      console.log('Error', err);
    });
  }

  async modalimmobilisation(cT: Inventaire) {
    const modal = await this.modalController.create({
      component: ModalinventaireComponent,
      cssClass: "modalimmobilisation",
      componentProps: {
        'immo': cT
      }
    });
    return await modal.present();
  }

  getimmo() {
    this.inventaireService.getlisteinventaire().subscribe(
      data => {
        this.searcheItem=data;
        this.inventaireService.inventaires = data;
      }
    )
  }

  getEvolution() {
    this.inventaireService.getEvolution()
  }

  cloturerInventaire() {

    let restinventaire:number=0;


    let clotureOperateurs: ClotureOperateur[] = [];
    this.inventaireService.inventaires.forEach(i => {
      let cloture: ClotureOperateur = new ClotureOperateur();
      cloture.referenceInventaire = i.referenceInventaire;
      cloture.id = i.id;
      cloture.referenceimmobilisation = i.immobilisation.reference
      if (i.etat=="initial"){
        restinventaire+=1
      }
      clotureOperateurs.push(cloture);
    });
    if (restinventaire>0){
      this.inventaireService.loginService.toastMessage("il vous reste "+restinventaire+" à inventorier","info")
      return;
    }
    this.is_loading = true;
    this.inventaireService.clotureInventaireOperateur(clotureOperateurs).subscribe(
      data => {
        this.is_loading = false;
        this.inventaireService.inventaires = null;
      }, error => {
        this.is_loading = false;
        console.log(error)
      }
    )
  }
}
