import { ModalgruppoComponent } from './../modalgruppo/modalgruppo.component';
import { ModalfeedComponent } from './../modalfeed/modalfeed.component';
import { Component, OnInit } from '@angular/core';
import {Utente} from '../../model/utente.model';
import {BehaviorSubject} from 'rxjs';
import {UtenteService} from '../../services/utente.service';
import { NavController, Platform, PopoverController, ModalController } from '@ionic/angular';


@Component({
  selector: 'app-impostazioni',
  templateUrl: './impostazioni.component.html',
  styleUrls: ['./impostazioni.component.scss'],
})

export class ImpostazioniComponent implements OnInit {
  private utente$: BehaviorSubject<Utente>;
  constructor( private navController: NavController, private utenteService: UtenteService, public popoverController: PopoverController,
               private modalController: ModalController) { }

  ngOnInit() {}

  logout() {
    this.close();
    this.utenteService.logout();
    this.navController.navigateRoot('login');
}
  close() { 
    this.popoverController.dismiss();
  }

  async presentFeeds() {
    const feeds = await this.modalController.create({
      component: ModalfeedComponent
    });
    return await feeds.present();
  }
}
