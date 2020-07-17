import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { MenuController, PopoverController } from '@ionic/angular';
import { ImpostazioniComponent } from '../impostazioni/impostazioni.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private menu:MenuController, public popoverController:PopoverController) { }

  ngOnInit() {}
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
}

async presentPopover2(ev: any) {
  const popover = await this.popoverController.create({
    component: ImpostazioniComponent,
    translucent: true,
    event: ev,
    animated:true,
    showBackdrop:true,
    mode: "ios",
    cssClass: 'popoverImpostazioni'
    
  });
  return await popover.present();
}
  
}
