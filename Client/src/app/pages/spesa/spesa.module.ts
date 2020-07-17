import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpesaPageRoutingModule } from './spesa-routing.module';

import { SpesaPage } from './spesa.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpesaPageRoutingModule
  ],
  declarations: [SpesaPage]
})
export class SpesaPageModule {}
