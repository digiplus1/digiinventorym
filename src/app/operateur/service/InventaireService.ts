import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginService} from "../../home/component/Service/LoginService";
import {AddressIp} from "../../Service/AddressIp";
import {Inventaire} from "../Model/Inventaire";
import {InventairePage} from "../Model/InventairePage";
import {Inventairesoumision} from "../Model/Inventairesoumision";
import {EvolutionInventaire} from "../Model/EvolutionInventaire";
import {ClotureOperateur} from "../Model/ClotureOperateur";
import {ConnectionStatus, NetworkService} from "../../Service/NetworkService";
import {Storage} from "@ionic/storage";
import {LoadingController} from "@ionic/angular";

@Injectable()
export class InventaireService {
  inventaires:Inventaire[];
   evolutionInventaire: EvolutionInventaire;
  offline:boolean=false;
  inventairesoumisions:Inventairesoumision[]=[];
  constructor(public http: HttpClient, public loginService: LoginService,private networkService: NetworkService,
              private storage: Storage,public loadingController: LoadingController) {
  }

  getlisteinventaire() {
    return this.http.get<Inventaire[]>(AddressIp.host + 'gestionproduit/Immobilisationinventaire/' + this.loginService.userLogin.matricule + "/" + this.loginService.userLogin.referencesession, {headers: new HttpHeaders({'Authorization': 'Token ' + this.loginService.userLogin.token})});
  }

  valideImmo(immo:Inventairesoumision,id_inventaire:number,forceRefresh: boolean = false) {
    if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh) {
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
      return this.http.patch<Inventairesoumision>(AddressIp.host + 'gestionproduit/validationinventaire/'+id_inventaire+"/",immo, {headers: new HttpHeaders({'Authorization': 'Token ' + this.loginService.userLogin.token})});
    }
  }

  validerModeOffline(){

    this.storage.get("inventaire").then(storage=>{
      if (storage){
        this.loadingController.create({
          cssClass: 'my-custom-class',
          message: 'Please wait...',
        }).then(l=>{
          l.present();
          return this.http.patch<Inventairesoumision[]>(AddressIp.host + 'gestionproduit/validationbulkinventaire/',this.inventairesoumisions, {headers: new HttpHeaders({'Authorization': 'Token ' + this.loginService.userLogin.token})}).subscribe(
            data=>{
              l.dismiss();
              data.forEach(s=>{
                this.inventaires.forEach(p=>{
                  if (p.referenceInventaire==s.referenceInventaire){
                    p.quantite = s.quantite
                    p.etat = "en_cours";
                  }
                })
              })
            },error => {
              l.dismiss();
            }
          );
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
