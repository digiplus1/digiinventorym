import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginService} from "../../home/component/Service/LoginService";
import {AddressIp} from "../../Service/AddressIp";
import {Inventaire} from "../Model/Inventaire";
import {Inventairesoumision} from "../Model/Inventairesoumision";
import {EvolutionInventaire} from "../Model/EvolutionInventaire";
import {ClotureOperateur} from "../Model/ClotureOperateur";
import {LoadingController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {Dialogs} from "@ionic-native/dialogs/ngx";
import {Network} from "@awesome-cordova-plugins/network/ngx";
import {Plugins} from '@capacitor/core';
import {Immobilisation} from "../Model/Immobilisation";

@Injectable()
export class InventaireService {
  inventaires: Inventaire[];
  evolutionInventaire: EvolutionInventaire;
  immobilisations:Immobilisation[]=[];
  /*  offlineSubscription:Subscription;*/
  onLine: boolean = false;
  // @ts-ignore
  /*
    offlineObserve:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(window.navigator.onLine);
  */
  inventairesoumisions: Inventairesoumision[] = [];

  constructor(public http: HttpClient, public loginService: LoginService, public network: Network,
              public dialogs: Dialogs, public loadingController: LoadingController, public storage: Storage) {

  }

  /* emitofflineSubject() {
     // @ts-ignore
     this.offlineObserve.next(navigator.onLine);
     if (this.onLine){
       this.validerModeOffline();
     }
   }*/
  getlisteinventaire() {
    return this.http.get<Inventaire[]>(AddressIp.host + 'gestionproduit/Immobilisationinventaire/' + this.loginService.userLogin.matricule + "/" + this.loginService.userLogin.referencesession, {headers: new HttpHeaders({'Authorization': 'Token ' + this.loginService.userLogin.token})});
  }

  valideImmo(immo: Inventairesoumision, id_inventaire: number) {
//this.emitofflineSubject();
    if (!this.onLine) {
      immo.id = id_inventaire;
      this.inventairesoumisions.push(immo);
      this.storage.remove('inventaire');
      this.storage.set('inventaire', this.inventairesoumisions);
      this.inventaires.forEach(i => {
          if (i.referenceInventaire == immo.referenceInventaire) {
            i.quantite_inventorier = immo.quantite_inventorier
            i.etat = "en_cours";
          }
        }
      )
    } else {
      this.doInventaire(immo, id_inventaire)
    }
  }

  doInventaire(immo: Inventairesoumision, id_inventaire: number) {

    this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    }).then(l => {
      l.present();

      return this.http.patch<Inventairesoumision>(AddressIp.host + 'gestionproduit/validationinventaire/'
        + id_inventaire + "/", immo,
        {headers: new HttpHeaders({'Authorization': 'Token ' + this.loginService.userLogin.token})}).subscribe(
        data => {

          this.inventaires.forEach(i => {
              if (i.referenceInventaire == data.referenceInventaire) {
                i.quantite_inventorier = data.quantite_inventorier
                i.etat = "en_cours";
              }
            }
          )
          this.getEvolution();
          l.dismiss();

        }, error => {
          l.dismiss();
        }, () => {
        }
      )
    })


  }

  validerModeOffline() {
    this.storage.get("inventaire").then((storage: Inventairesoumision[]) => {
      if (storage) {
        console.log(storage)
        let sizeinventaire: number = 0;
        storage.forEach(i => {
          sizeinventaire += 1;
          this.doInventaire(i, i.id);
          if (sizeinventaire == storage.length) {
            this.storage.remove('inventaire');
          }
        })
      }
    })
  }

  getEvolution() {
    return this.http.get<EvolutionInventaire>(AddressIp.host + 'gestionproduit/Immobilisationstat/' +
      this.loginService.userLogin.matricule + "/" + this.loginService.userLogin.referencesession,
      {headers: new HttpHeaders({'Authorization': 'Token ' + this.loginService.userLogin.token})}).subscribe(
      data => {
        this.evolutionInventaire = data;
        this.evolutionInventaire.total = data.intial + data.en_cours
      }
    );
  }

  clotureInventaireOperateur(clotureOperateurs: ClotureOperateur[]) {
    return this.http.patch<Inventairesoumision>(AddressIp.host + 'gestionproduit/validationbulkinventaire/', clotureOperateurs, {headers: new HttpHeaders({'Authorization': 'Token ' + this.loginService.userLogin.token})});

  }

  validerNouvelleInventaire(immobilisation: Immobilisation) {
    return this.http.post<Immobilisation>(AddressIp.host + 'gestionproduit/immobilisationNonStock/', immobilisation, {headers: new HttpHeaders({'Authorization': 'Token ' + this.loginService.userLogin.token})});
  }
  getAllNouvelleInventaire() {
    return this.http.get<Immobilisation[]>(AddressIp.host + 'gestionproduit/Immobilisationnonstock/'+this.loginService.userLogin.referencesession+'/'+this.loginService.userLogin.matricule+'/', {headers: new HttpHeaders({'Authorization': 'Token ' + this.loginService.userLogin.token})});
  }

  valideNewImmoOffline(immo: Immobilisation) {
//this.emitofflineSubject();
    if (!this.onLine) {
      let immomm:Immobilisation=immo;
      this.immobilisations.push(immomm);
      this.storage.remove('immobilisation');
      this.storage.set('immobilisation', this.immobilisations);
      this.loginService.toastMessage("Enregistrement local avec succes","info")
    }
  }

  validerNouvelleInventaireOffline(immobilisations: Immobilisation[]) {
    this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    }).then(l => {
      l.present();

      return this.http.post<Immobilisation[]>(AddressIp.host + 'gestionproduit/ImmobilisationnonstockBulk/',
      immobilisations, {headers: new HttpHeaders({'Authorization': 'Token ' + this.loginService.userLogin.token})}).subscribe(
        data=>{
          immobilisations=data;
          this.storage.remove('immobilisation');
          l.dismiss();

        }, error => {
          l.dismiss();

        }, () => {
          this.storage.remove('immobilisation');
        }
      )
    }
    )
  }

valideoflineModeNewImmo(){
    this.storage.get("immobilisation").then((storage: Immobilisation[]) => {
      if (storage) {
        console.log(storage);
        let sizeinventaire: number = 0;
        storage.forEach(i=>{
          sizeinventaire+=1
          this.validerNouvelleInventaire(i).subscribe(
            data=>{

            }
          )
          if (sizeinventaire == storage.length) {
            this.storage.remove('immobilisation');
          }
        })

      }

    })

}
  testConnexion() {
    this.onLine = navigator.onLine;
    if (this.onLine){
      this.validerModeOffline();
      this.valideoflineModeNewImmo();
    }

  }

}
