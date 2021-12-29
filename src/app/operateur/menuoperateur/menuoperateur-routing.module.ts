import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuoperateurPage } from './menuoperateur.page';
import {ElementinventoryPage} from "../elementinventory/elementinventory.page";
import {AproposPage} from "../apropos/apropos.page";

const routes: Routes = [
  {
    path: '',
    component: MenuoperateurPage,
    children:[
      {
        path:'acceuil',
        component:ElementinventoryPage
      },
      {
        path:'apropos',
        component:AproposPage
      },
      {
        path: 'equipement',
        loadChildren: () => import('../equipement/equipement.module').then( m => m.EquipementPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuoperateurPageRoutingModule {}
