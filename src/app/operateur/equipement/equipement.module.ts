import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EquipementPageRoutingModule } from './equipement-routing.module';

import { EquipementPage } from './equipement.page';
import {ModallisteequipementComponent} from "./modallisteequipement/modallisteequipement.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EquipementPageRoutingModule
  ],
  declarations: [EquipementPage,ModallisteequipementComponent]
})
export class EquipementPageModule {}
