import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'elementinventory',
    loadChildren: () => import('./operateur/elementinventory/elementinventory.module').then( m => m.ElementinventoryPageModule)
  },
  {
    path: 'menuoperateur',
    loadChildren: () => import('./operateur/menuoperateur/menuoperateur.module').then( m => m.MenuoperateurPageModule)
  },
  {
    path: 'apropos',
    loadChildren: () => import('./operateur/apropos/apropos.module').then( m => m.AproposPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
