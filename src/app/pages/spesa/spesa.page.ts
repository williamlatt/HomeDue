import { ModalimgComponent } from './../../components/modalimg/modalimg.component';
import { PopoverimageComponent } from './../../components/popoverimage/popoverimage.component';
import { GruppoService } from './../../services/gruppo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UtenteService } from 'src/app/services/utente.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Utente_spesa } from 'src/app/model/utente_spesa.model';
import { SpesaService } from 'src/app/services/spesa.service';
import { Utente_spesaService } from 'src/app/services/utente_spesa.service';
import { IonInfiniteScroll, IonRefresher, IonItemSliding, AlertController, ModalController, PopoverController } from '@ionic/angular';
import { Spesa } from 'src/app/model/spesa.model';
import { Gruppo } from 'src/app/model/gruppo.model';


@Component({
  selector: 'app-spesa',
  templateUrl: './spesa.page.html',
  styleUrls: ['./spesa.page.scss'],
})
export class SpesaPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonRefresher) IonRefresher: IonRefresher;
  public us$: Observable<Utente_spesa[]>;
  public us2$: Utente_spesa[] = [];
  public s$: Observable<Spesa[]>;
  public s2$: Spesa[];
  public g$: BehaviorSubject<Gruppo>;
  public slice = 2;
  public reset = false;
  constructor( private utenteService: UtenteService,
               private spesaService: SpesaService,
               // tslint:disable-next-line: variable-name
               private utente_spesaService: Utente_spesaService,
               private alertController: AlertController,
               private gruppoService: GruppoService,
               private popoverController: PopoverController,
               private modalController: ModalController
               ) {

    }


  ngOnInit() {
    this.g$ = this.gruppoService.getGruppo();
    this.s$ = this.spesaService.listaSpese();
    this.s$.subscribe(m => this.s2$ = m);
    this.us$ = this.utente_spesaService.listaSpese();
    this.us$.subscribe(m => this.us2$ = m);

  }

  loadData(ev) {
    if (this.s2$.length > this.slice && !this.reset) {
      setTimeout(() => {
      this.slice += 2;
      ev.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
    }, 500);
  } else {
    this.reset = true;
    ev.target.complete();
      // ev.target.disabled = false;
  }
  }

   doRefresh() {
    this.us$ = this.utente_spesaService.listaSpese();
    this.us$.subscribe(m => this.us2$ = m);
    this.s$ = this.spesaService.listaSpese();
    this.s$.subscribe(m => this.s2$ = m);
    this.slice = 2;
    this.reset = false;

    setTimeout(() => {
      this.IonRefresher.complete();
    }, 1000);
  }

  async delete(spesa: Spesa, sliding: IonItemSliding) {
    sliding.close();
    const alert = await this.alertController.create({
      header: 'Cancella spesa?',
      message: 'Sei sicuro di voler cancellare la spesa?',
      buttons: [
          {
            text: 'Annulla',
            role: 'cancel',
            cssClass: 'secondary',
          },
        {
          text: 'Ok',
          handler: () => {
            this.spesaService.delete(spesa).subscribe(() => {
              this.s$ = this.spesaService.listaSpese();
              this.s$.subscribe(m => this.s2$ = m);
              this.us$ = this.utente_spesaService.listaSpese();
              this.us$.subscribe(m => this.us2$ = m);
            });

          }
        }
      ]
    });

    await alert.present();
    }

    async openPopover(ss: Spesa) {
      const modal = await this.modalController.create({
        component: ModalimgComponent,
        componentProps: {spesa: ss},
        animated: true,
        showBackdrop: true,
        mode: 'ios',
      });
      return await modal.present();
    }
}
