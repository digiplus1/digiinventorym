import {Component, OnInit} from '@angular/core';
import {InventaireService} from "../service/InventaireService";
import {ModalController} from "@ionic/angular";
import {ModalinventaireComponent} from "./modalinventaire/modalinventaire.component";
import {Inventaire} from "../Model/Inventaire";
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner/ngx";
import {Inventairesoumision} from "../Model/Inventairesoumision";
import {ClotureOperateur} from "../Model/ClotureOperateur";
import {Router} from "@angular/router";

@Component({
  selector: 'app-elementinventory',
  templateUrl: './elementinventory.page.html',
  styleUrls: ['./elementinventory.page.scss'],
})
export class ElementinventoryPage implements OnInit {
  searcheItem: Inventaire[];
  is_loading: boolean;

  constructor(private modalController: ModalController, private barcodeScanner: BarcodeScanner,
              public inventaireService: InventaireService,public router:Router) {
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
    //https://enappd.com/blog/ionic-complete-guide-barcode-qrcode-scan/140/
    let options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
      orientation: 'portrait',
    };

    this.barcodeScanner.scan(options).then(barcodeData => {
      let inventaire = this.inventaireService.inventaires.find(i => i.immobilisation.codeBarre == barcodeData.text);

      if (inventaire){
        if (inventaire.immobilisation.is_generique) {
          this.modalimmobilisation(inventaire);
        } else {
          if (inventaire.etat=="initial"){
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
                this.inventaireService.getEvolution();

              }, error => {
              }
            )
          }else {
            this.inventaireService.loginService.toastMessage("Immobilisation unique et deja inventoriée","info")

          }
        }
      }else {
        this.inventaireService.loginService.toastMessage("Immobilisation non trouvée","info")
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
      },
      backdropDismiss:false
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
        this.router.navigateByUrl("home")
      }, error => {
        this.is_loading = false;
        console.log(error)
      }
    )
  }
}
