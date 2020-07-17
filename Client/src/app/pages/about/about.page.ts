import { Utente_spesaService } from './../../services/utente_spesa.service';
import { Storage } from '@ionic/storage';
import { PopoversaldoComponent } from './../../components/popoversaldo/popoversaldo.component';
import { GruppoService } from './../../services/gruppo.service';
import { UtenteService } from './../../services/utente.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MenuController, PopoverController, AlertController} from '@ionic/angular';
import { Chart} from 'chart.js';
import { ImpostazioniComponent } from 'src/app/components/impostazioni/impostazioni.component';
import { Observable, BehaviorSubject} from 'rxjs';
import { Utente_gruppoService } from 'src/app/services/utente_gruppo.service';
import { Utente } from 'src/app/model/utente.model';
import { Gruppo } from 'src/app/model/gruppo.model';
import { Utente_gruppo } from 'src/app/model/utente_gruppo.model';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { Utente_spesa } from 'src/app/model/utente_spesa.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})

export class AboutPage implements OnInit {
  public utente$: BehaviorSubject<Utente>;
  private ug$: Observable<Utente_gruppo[]>;
  private us$: Observable<Utente_spesa[]>;
  public g$: BehaviorSubject<Gruppo>;
  public ug2$: Utente_gruppo[];
  public us2$: Utente_spesa[];
  public saldi;
  public valori;
  private partecipanti;
  @ViewChild ('barChart', {static: false}) barChart;
 public gruppos;
  bars: any;
  contatore = 0;
  colorArray: any;

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(private menu: MenuController, public alertController: AlertController, public popoverController: PopoverController,
              private utenteService: UtenteService, private utente_gruppoService: Utente_gruppoService,
              private gruppoService: GruppoService, private elRef: ElementRef, private storage: Storage,
              private utente_spesaService: Utente_spesaService
             ) {}

  ngOnInit() {
       this.g$ = this.gruppoService.getGruppo();
       this.partecipanti = [];
       this.utente$ = this.utenteService.getUtente();
       this.ug$ = this.utente_gruppoService.listaGruppoAllUtente();
       this.ug$.subscribe(m => this.ug2$ = m);
       this.us$ = this.utente_spesaService.listaSpese();
       this.us$.subscribe(m => this.us2$ = m);
       var count = 0;

       this.ug$.subscribe(element => {
     element.forEach(element2 => {
      if (!this.partecipanti.some(item => item.gruppo === element2.gruppo.id )) {
        this.partecipanti.push({gruppo: element2.gruppo.id, partecipanti: {}});
        this.partecipanti.some(item => {
          if (item.gruppo === element2.gruppo.id) {
            item.partecipanti[count] = {utente: element2.utente, saldo: element2.saldo};
            count++;
          }
        });
      } else {
        this.partecipanti.some(item => {
          if (item.gruppo === element2.gruppo.id) {
            item.partecipanti[count] = {utente: element2.utente, saldo: element2.saldo};
            count++;
          }
        });
      }
  });
});
}


calcoloSaldi(id) {
  var buste = [];
  this.saldi = [];
  this.partecipanti.forEach(element => {
    if (element.gruppo === id) {
      Object.getOwnPropertyNames(element.partecipanti).forEach(element2 => {
        buste.push({saldo: element.partecipanti[element2].saldo, utente: element.partecipanti[element2].utente});
      }
    );
  }
});


  for (let index = 0; index < buste.length - 1; index++) {
    if (buste[0] !== 'undefined') {
      buste.sort((a, b) => parseFloat(b.saldo) - parseFloat(a.saldo));
      var min = Math.min(Math.abs(buste[0].saldo), Math.abs(buste[buste.length - 1].saldo));
      this.saldi.push({da: buste[buste.length - 1].utente, per: buste[0].utente, importo: min});
      buste[0].saldo -= min;
      buste[buste.length - 1].saldo += min;
    }
}
  return(this.saldi);


}


  async presentPopover2(ev: any) {
    const popover = await this.popoverController.create({
      component: ImpostazioniComponent,
      translucent: true,
      event: ev,
      animated: true,
      showBackdrop: true,
    });
    return await popover.present();
  }

  ionViewDidEnter() {
    this.valori = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.us$ = this.utente_spesaService.listaSpese();
    this.us$.subscribe((m) => {
      m.forEach(element => {
        if(element.spesa.gruppo.id === this.g$.getValue().id && element.utente.id === this.utente$.getValue().id){
          var data = new Date(element.spesa.dataPubblicazione);
          switch (data.getMonth()) {
            case 1:
              this.valori[0] += element.importo;
              break;
            case 2:
              this.valori[1] += element.importo;
              break;
            case 3:
              this.valori[2] += element.importo;
              break;
            case 4:
              this.valori[3] += element.importo;
              break;
            case 5:
              this.valori[4] += element.importo;
              break;
            case 6:
              this.valori[5] += element.importo;
              break;
            case 7:
              this.valori[6] += element.importo;
              break;
            case 8:
              this.valori[7] += element.importo;
              break;
            case 9:
              this.valori[8] += element.importo;
              break;
            case 10:
              this.valori[9] += element.importo;
              break;
            case 11:
              this.valori[10] += element.importo;
              break;
            case 12:
              this.valori[11] += element.importo;
              break;
            default:
              //Comandi eseguiti quando nessuno dei valori coincide col valore dell'epressione
              break;
          }
        }
      });
      this.us2$ = m;

      this.bars = new Chart(this.barChart.nativeElement, {
        type: 'line',
        data: {
          labels: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'],
          datasets: [{
            label: 'Il mio Saldo mensile',
            data: this.valori,
             // array should have same number of elements as number of dataset
            borderColor: '#ff00ff', // array should have same number of elements as number of dataset
            borderWidth: 1
          }]
        },
        options: {
          layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
              }
            }]
          }
        }
      });
    }
    );
   
  }

  async presentPopoverSaldo(ev: any, id) {
    const popover = await this.popoverController.create({
      component: PopoversaldoComponent,
      componentProps: {id_gruppo: id, utenti: this.ug2$},
      translucent: true,
      event: ev,
      animated: true,
      showBackdrop: true,
      mode: 'ios',
      cssClass: 'popoverImpostazioni'
    });
    return await popover.present();
  }
}
