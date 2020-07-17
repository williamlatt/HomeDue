import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpesaPage } from './spesa.page';

const routes: Routes = [
  {
    path: '',
    component: SpesaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SpesaPageRoutingModule {}
