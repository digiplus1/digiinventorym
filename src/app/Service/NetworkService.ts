import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx'
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController, Platform } from '@ionic/angular';
import {Dialogs} from "@ionic-native/dialogs/ngx";

@Injectable({
  providedIn: 'root'
})
export class NetworkService {



  constructor(private network: Network,public dialogs:Dialogs) {

  }


}
