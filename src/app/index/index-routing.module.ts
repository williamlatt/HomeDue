import { UtenteService } from './../services/utente.service';
import { Storage } from '@ionic/storage';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IndexPage } from './index.page';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: IndexPage,
    children: [
      {
        path: 'pieroasdas',
        loadChildren:() => import('../pages/welcome/welcome.module').then( m => m.WelcomePageModule),
      },
      {
        path: 'login',
        loadChildren:() => import('../pages/login/login.module').then( m => m.LoginPageModule)
      },
      {
        path: 'login2',
        loadChildren:() => import('../pages/login/login.module').then( m => m.LoginPageModule),
      },
      {
        path: 'signup',
        loadChildren:() => import('../pages/signup/signup.module').then( m => m.SignupPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IndexPageRoutingModule {}
