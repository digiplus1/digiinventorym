import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginService} from "../../home/component/Service/LoginService";
import {AddressIp} from "../../Service/AddressIp";
import {Inventaire} from "../Model/Inventaire";
import {InventairePage} from "../Model/InventairePage";
import {Inventairesoumision} from "../Model/Inventairesoumision";
import {EvolutionInventaire} from "../Model/EvolutionInventaire";
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";

@Injectable()
export class InventaireService {

  constructor(public http: HttpClient, public loginService: LoginService) {
  }

  getlisteinventaire() {
    return this.http.get<InventairePage>(AddressIp.host + 'gestionproduit/Immobilisationinventaire/' + this.loginService.userLogin.matricule + "/" + this.loginService.userLogin.referencesession, {headers: new HttpHeaders({'Authorization': 'Token ' + this.loginService.userLogin.token})});
  }

  valideImmo(immo:Inventairesoumision,id_inventaire:number) {
    return this.http.patch<InventairePage>(AddressIp.host + 'gestionproduit/validationinventaire/'+id_inventaire+"/",immo, {headers: new HttpHeaders({'Authorization': 'Token ' + this.loginService.userLogin.token})});
  }

  getEvolution() {
    return this.http.get<EvolutionInventaire>(AddressIp.host + 'gestionproduit/Immobilisationstat/' + this.loginService.userLogin.matricule + "/" + this.loginService.userLogin.referencesession, {headers: new HttpHeaders({'Authorization': 'Token ' + this.loginService.userLogin.token})});
  }




}
