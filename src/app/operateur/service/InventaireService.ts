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
import {BehaviorSubject, Subscription} from "rxjs";
import {Network} from "@ionic-native/network/ngx";
import {Dialogs} from "@ionic-native/dialogs/ngx";

@Injectable()
export class InventaireService {
  inventaires:Inventaire[];
   evolutionInventaire: EvolutionInventaire;
   offlineSubscription:Subscription;
  onLine:boolean=false;
  // @ts-ignore
  offlineObserve:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(window.navigator.onLine);
  inventairesoumisions:Inventairesoumision[]=[];
  constructor(public http: HttpClient, public loginService: LoginService,private network: Network,public dialogs:Dialogs,public loadingController: LoadingController,public storage:Storage) {
    let disconnectSubscription = this.network.onDisconnect().subscribe(()=>{
      dialogs.alert("Network was disconnected")
      this.onLine=false;
    })
// stop disconnect watch
    disconnectSubscription.unsubscribe();


    let connectSubscription =  this.network.onConnect().subscribe(()=>{
      dialogs.alert("we got a "+this.network.type+" connection");
      this.onLine=true;
    })
    // stop connect watch
    connectSubscription.unsubscribe();
    this.offlineSubscription=this.offlineObserve.subscribe(
      off=>{
        this.onLine=off;
      }
    )
 /*  setInterval(()=>{
     this.emitofflineSubject();
   },1000)*/
  }
  emitofflineSubject() {
    // @ts-ignore
    this.offlineObserve.next(navigator.onLine);
    if (this.onLine){
      this.validerModeOffline();
    }
  }
  getlisteinventaire() {
    return this.http.get<Inventaire[]>(AddressIp.host + 'gestionproduit/Immobilisationinventaire/' + this.loginService.userLogin.matricule + "/" + this.loginService.userLogin.referencesession, {headers: new HttpHeaders({'Authorization': 'Token ' + this.loginService.userLogin.token})});
  }

  valideImmo(immo:Inventairesoumision,id_inventaire:number) {

    if (!this.onLine) {
      immo.id=id_inventaire;
      this.inventairesoumisions.push(immo);
      this.storage.remove('inventaire');
      this.storage.set('inventaire',this.inventairesoumisions);
      this.inventaires.forEach(i => {
          if (i.referenceInventaire == immo.referenceInventaire) {
            i.quantite = immo.quantite
            i.etat = "en_cours";
          }
        }
      )
    }else {
      this.doInventaire(immo, id_inventaire)
    }
  }

  doInventaire(immo:Inventairesoumision,id_inventaire:number){

    this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
    }).then(l=>{
      l.present();

      return this.http.patch<Inventairesoumision>(AddressIp.host + 'gestionproduit/validationinventaire/'
        +id_inventaire+"/",immo,
        {headers: new HttpHeaders({'Authorization': 'Token ' + this.loginService.userLogin.token})}).subscribe(
        data => {

          this.inventaires.forEach(i => {
              if (i.referenceInventaire == data.referenceInventaire) {
                i.quantite = data.quantite
                i.etat = "en_cours";
              }
            }
          )
          this.getEvolution();
          l.dismiss();

        }, error => {
          l.dismiss();
        },()=>{
        }
      )
    })




  }

  validerModeOffline(){
    this.storage.get("inventaire").then((storage:Inventairesoumision[])=>{
      if (storage){
        let sizeinventaire:number=0;
        storage.forEach(i=>{
          sizeinventaire+=1;
          this.doInventaire(i,i.id);
          if (sizeinventaire==storage.length){
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
      data=>{
        this.evolutionInventaire=data;
        this.evolutionInventaire.total=data.intial+data.en_cours
      }
    );
  }

  clotureInventaireOperateur(clotureOperateurs:ClotureOperateur[]){
    return this.http.patch<Inventairesoumision>(AddressIp.host + 'gestionproduit/validationbulkinventaire/',clotureOperateurs, {headers: new HttpHeaders({'Authorization': 'Token ' + this.loginService.userLogin.token})});

  }



}
