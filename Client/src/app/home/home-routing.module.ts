import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'spesa',
        loadChildren: () => import('../pages/spesa/spesa.module').then( m => m.SpesaPageModule),
        canActivateChild: [AuthGuard]
      },
      {
        path: 'about',
        loadChildren: () => import('../pages/about/about.module').then( m => m.AboutPageModule),
        canActivateChild: [AuthGuard]
      },
      {
        path: '',
        loadChildren: () => import('../pages/about/about.module').then(m => m.AboutPageModule),
        canActivateChild: [AuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
