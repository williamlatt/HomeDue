import { ModalimgComponent } from './modalimg/modalimg.component';
import { PopoverimageComponent } from './popoverimage/popoverimage.component';
import { ModalgruppoComponent } from './modalgruppo/modalgruppo.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesComponent } from './slides/slides.component';
import { StartComponent } from './start/start.component';
import { LogoComponent } from './logo/logo.component';
import { MenuComponent } from './menu/menu.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { CavansComponent } from './cavans/cavans.component';
import { ImpostazioniComponent } from './impostazioni/impostazioni.component';
import { PopjoingroupComponent } from './popjoingroup/popjoingroup.component';
import { ModalspesaComponent } from './modalspesa/modalspesa.component';
import { ImgpickerComponent } from './imgpicker/imgpicker.component';
import { ModalfeedComponent } from './modalfeed/modalfeed.component';
import { PopoversaldoComponent } from './popoversaldo/popoversaldo.component';


@NgModule({
  declarations: [SlidesComponent, StartComponent, LogoComponent, MenuComponent, HeaderComponent,
    CavansComponent, ImpostazioniComponent, ModalgruppoComponent,
    PopjoingroupComponent, ModalspesaComponent, ImgpickerComponent, ModalfeedComponent,
    PopoversaldoComponent,PopoverimageComponent, ModalimgComponent],
  exports: [SlidesComponent, StartComponent, LogoComponent, MenuComponent, HeaderComponent,
    CavansComponent, ImpostazioniComponent, ModalgruppoComponent,
    PopjoingroupComponent, ModalspesaComponent, ImgpickerComponent, ModalfeedComponent,
    PopoversaldoComponent, PopoverimageComponent , ModalimgComponent],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class ComponentsModule { }
