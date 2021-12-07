import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import {LoginComponent} from "./component/login/login.component";

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children : [
      {
        path : '',
        component: LoginComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
