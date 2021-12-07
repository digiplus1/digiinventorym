import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ElementinventoryPage } from './elementinventory.page';

const routes: Routes = [
  {
    path: '',
    component: ElementinventoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ElementinventoryPageRoutingModule {}
