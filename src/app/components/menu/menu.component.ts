import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { MenuController, PopoverController, ModalController, NavController } from '@ionic/angular';
import {PopjoingroupComponent} from '../popjoingroup/popjoingroup.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { Utente } from 'src/app/model/utente.model';
import { UtenteService } from 'src/app/services/utente.service';
import { GruppoService } from 'src/app/services/gruppo.service';
import { Gruppo } from 'src/app/model/gruppo.model';
import { Utente_gruppoService } from 'src/app/services/utente_gruppo.service';
import { Utente_gruppo } from 'src/app/model/utente_gruppo.model';
import { ModalgruppoComponent } from '../modalgruppo/modalgruppo.component';
import {Storage} from '@ionic/storage';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private menu: MenuController,
              public popoverController: PopoverController,
              private utenteService: UtenteService,
              private gruppoService: GruppoService,
              // tslint:disable-next-line: variable-name
              private utente_gruppoService: Utente_gruppoService,
              private modalController: ModalController,
              private navController: NavController,
              private storage: Storage,
              private renderer: Renderer2,
) { }
  public utente$: BehaviorSubject<Utente>;
  private gruppi$: Observable<Gruppo[]>;
  private ug$: Observable<Utente_gruppo[]>;
  public g$: Gruppo[];
  public stored$: BehaviorSubject<Gruppo>;
  public ug2$: Utente_gruppo[];
  @ViewChild(PopoverController) patecipanti: PopoverController;


  ngOnInit() {
   this.stored$ = this.gruppoService.getGruppo();
   this.utente$ = this.utenteService.getUtente();
   this.ug$ = this.utente_gruppoService.listaGruppoAllUtente();
   this.ug$.subscribe(m => this.ug2$ = m);
   this.gruppi$ = this.gruppoService.listaGruppi();
   this.gruppi$.subscribe(m => this.g$ = m);
  }
  async presentPopJoin(ev: any) {
    const popover = await this.popoverController.create({
      component: PopjoingroupComponent,
      translucent: true,
      event: ev,
      animated: true,
      showBackdrop: true,
      mode: 'ios',
      cssClass: 'popOver'


    });
    return await popover.present();
  }
  async presentModal() {

    const modal = await this.modalController.create({
      component: ModalgruppoComponent
    });
    return await modal.present();
  }
  setGruppo(id) {
    location.reload();
    this.storage.set('gruppo', id);
  }




}
