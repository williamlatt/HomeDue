import { GruppoService } from 'src/app/services/gruppo.service';
import { UtenteService } from './../../services/utente.service';
import { Utente_spesaService } from './../../services/utente_spesa.service';
import { SpesaService } from './../../services/spesa.service';
import { Utente_gruppoService } from 'src/app/services/utente_gruppo.service';
import { Feed } from './../../model/feed.model';
import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { FeedService } from 'src/app/services/feed.service';
import { Utente_gruppo } from 'src/app/model/utente_gruppo.model';
import { Spesa } from 'src/app/model/spesa.model';
import { Utente_spesa } from 'src/app/model/utente_spesa.model';
import { Utente } from 'src/app/model/utente.model';
import { ToastController, ModalController, PopoverController } from '@ionic/angular';
import { Gruppo } from 'src/app/model/gruppo.model';

@Component({
  selector: 'app-modalfeed',
  templateUrl: './modalfeed.component.html',
  styleUrls: ['./modalfeed.component.scss'],
})
export class ModalfeedComponent implements OnInit {


  constructor(private feedService: FeedService, private utente_gruppoService: Utente_gruppoService, private spesaService: SpesaService ,
              private  utente_spesaService: Utente_spesaService, private utenteService: UtenteService,
              private toastCtrl: ToastController, private modalController: ModalController, private popoverController: PopoverController,
              private gruppoService: GruppoService) { }
  public gruppo$ :BehaviorSubject<Gruppo>;
  public utente$: BehaviorSubject<Utente>;
  private gruppo: Gruppo;
  private feed$: Observable<Feed[]>;
  private feed2$;
  public us$: Observable<Utente_spesa[]>;
  public us2$: Utente_spesa[] = [];

  ngOnInit() {
    this.feed$ = this.feedService.allFeed();
    this.feed$.subscribe(m => this.feed2$ = m);
    this.us$ = this.utente_spesaService.listaSpese();
    this.us$.subscribe(m => this.us2$ = m);
  }
  restore(feed: Feed) {
    this.spesaService.restoreSpesa(feed).subscribe(() => {
    this.feed$ = this.feedService.allFeed();
    this.feed$.subscribe(m => this.feed2$ = m);
    });
  }
  Saldo(feed: Feed , acc: boolean) {
    this.utente$ = this.utenteService.getUtente();
    if (this.us2$.some(item => item.spesa.id === feed.spesa.id && !item.proprietario && item.utente.id === this.utente$.getValue().id )) {
      this.spesaService.Saldo(feed, acc).subscribe(() => {
      this.feed$ = this.feedService.allFeed();
      this.feed$.subscribe(m => this.feed2$ = m);
      });
    } else {
      this.showErrorToast();
    }

  }
  close(){
    this.popoverController.dismiss();
    this.modalController.dismiss();
   
  }
async showErrorToast() {
    const toast = await this.toastCtrl.create({
      message: 'Non sei il beneficiario del saldo, non puoi ne accettare ne declinare',
      duration: 3000,
      position: 'top',
      color: 'danger',
      });
    await toast.present();
  }
}
