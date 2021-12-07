import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {LoginComponent} from "./component/login/login.component";
import {LoginService} from "./component/Service/LoginService";
import {HttpClientModule} from "@angular/common/http";
const COMPONENTS = [
  LoginComponent,
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule, HttpClientModule, ReactiveFormsModule
  ],
  providers:[],
  declarations: [HomePage,COMPONENTS],exports:[COMPONENTS]
})
export class HomePageModule {}
