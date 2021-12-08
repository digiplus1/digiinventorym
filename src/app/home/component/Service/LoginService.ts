import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../Model/User";
import {AddressIp} from "../../../Service/AddressIp";
import {ToastController} from "@ionic/angular";
import {Router} from "@angular/router";

@Injectable()
export class LoginService{
  public userLogin: User = new User();
  public emailVerification: string = '';

  constructor(
    private http: HttpClient,public toastController: ToastController,public router:Router) { }

  async toastMessage(message:string,css) {
    //css info success error
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position:'top',
      cssClass:css
    });
    toast.present();
  }
  login(user: User) {
    return this.http.post<User>(AddressIp.host + 'users/login/', user)
  }
  verifierLocalStorage(){
    this.userLogin= JSON.parse(localStorage.getItem('userLogin'));
    if (this.userLogin){
      this.router.navigateByUrl('/menuoperateur/acceuil')
    }else {
      this.router.navigateByUrl('/home')
    }
  }
  deconnexion() {
    this.userLogin=null;
    localStorage.removeItem("userLogin");
    this.router.navigateByUrl('');
  }
}
