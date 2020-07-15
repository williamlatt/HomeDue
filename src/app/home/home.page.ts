import { Component, OnInit } from '@angular/core';
import { PopoverController, ModalController, MenuController, NavController } from '@ionic/angular';
import { ModalspesaComponent } from '../components/modalspesa/modalspesa.component';
import { BehaviorSubject } from 'rxjs';
import { Utente } from '../model/utente.model';
import { UtenteService } from '../services/utente.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
constructor( public modalController: ModalController, private utenteService: UtenteService, private menu: MenuController,
             private navController: NavController) { }

  ngOnInit() {

  }
  async presentModal() {

    const modal = await this.modalController.create({
      component: ModalspesaComponent
    });
    return await modal.present();
  }

  openSpesa() {
    this.navController.navigateRoot('spese');
  }
  openAbout() {
    this.navController.navigateRoot('/about');
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

}
