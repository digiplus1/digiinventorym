import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuoperateurPageRoutingModule } from './menuoperateur-routing.module';

import { MenuoperateurPage } from './menuoperateur.page';
import {TestnavigationComponent} from "../testnavigation/testnavigation.component";
import {ElementinventoryPage} from "../elementinventory/elementinventory.page";
import {ElementinventoryPageModule} from "../elementinventory/elementinventory.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuoperateurPageRoutingModule,
    ElementinventoryPageModule,
  ],
  exports:[TestnavigationComponent],
  declarations: [MenuoperateurPage,TestnavigationComponent,]
})
export class MenuoperateurPageModule {}
