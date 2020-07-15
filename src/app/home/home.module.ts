import { PopoversaldoComponent } from './../components/popoversaldo/popoversaldo.component';
import { ModalfeedComponent } from './../components/modalfeed/modalfeed.component';
import { ModalgruppoComponent } from './../components/modalgruppo/modalgruppo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { ComponentsModule } from '../components/components.module';
import { CavansComponent } from '../components/cavans/cavans.component';
import { ImpostazioniComponent } from '../components/impostazioni/impostazioni.component';
import { PopjoingroupComponent } from '../components/popjoingroup/popjoingroup.component';
import { ModalspesaComponent } from '../components/modalspesa/modalspesa.component';

@NgModule({
  entryComponents: [CavansComponent, ImpostazioniComponent, PopjoingroupComponent, ModalspesaComponent,
    ModalgruppoComponent, ModalfeedComponent, PopoversaldoComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
