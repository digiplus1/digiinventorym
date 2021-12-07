import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ElementinventoryPageRoutingModule } from './elementinventory-routing.module';

import { ElementinventoryPage } from './elementinventory.page';
import {ModalinventaireComponent} from "./modalinventaire/modalinventaire.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ElementinventoryPageRoutingModule
  ],
  declarations: [ElementinventoryPage,ModalinventaireComponent]
})
export class ElementinventoryPageModule {}
