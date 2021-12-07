import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuoperateurPage } from './menuoperateur.page';
import {ElementinventoryPage} from "../elementinventory/elementinventory.page";
import {TestnavigationComponent} from "../testnavigation/testnavigation.component";

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
        path:'test',
        component:TestnavigationComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuoperateurPageRoutingModule {}
