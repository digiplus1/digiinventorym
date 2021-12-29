import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {LoginService} from "./home/component/Service/LoginService";
import {HttpClientModule} from "@angular/common/http";
import {InventaireService} from "./operateur/service/InventaireService";
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import {Storage} from "@ionic/storage";
import {Dialogs} from "@ionic-native/dialogs/ngx";
import {Network} from "@awesome-cordova-plugins/network/ngx";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    LoginService,
    InventaireService,
    BarcodeScanner,
    Network,
    Storage,
    Dialogs,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
