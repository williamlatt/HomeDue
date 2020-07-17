import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivateChild: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () => import('./index/index.module').then(m => m.IndexPageModule),
  },
  {
    path: '',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule),
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
